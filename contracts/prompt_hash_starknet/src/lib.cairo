use starknet::{ContractAddress, ClassHash};

#[derive(Clone, Drop, Serde, starknet::Store)]
pub struct Prompt {
    pub id: u256,
    pub image_url: ByteArray,
    pub description: ByteArray,
    pub price: u256,
    pub for_sale: bool,
    pub sold: bool,
    pub owner: ContractAddress,
    pub category: ByteArray,
    pub title: ByteArray,
}

#[starknet::interface]
pub trait IPromptHash<TContractState> {
    fn create_prompt(ref self: TContractState, image_url: ByteArray, description: ByteArray, title: ByteArray, category: ByteArray, price: u256) -> u256;
    fn get_next_token(self: @TContractState) -> u256;
    fn list_prompt_for_sale(ref self: TContractState, token_id: u256, price: u256);
    fn buy_prompt(ref self: TContractState, token_id: u256);
    fn get_all_prompts(self: @TContractState) -> Array<Prompt>;
    fn set_fee_percentage(ref self: TContractState, new_fee_percentage: u256);
    fn set_fee_wallet(ref self: TContractState, new_fee_wallet: ContractAddress);
    fn upgrade(ref self: TContractState, new_class_hash: ClassHash);
}

#[starknet::contract]
pub mod PromptHash {
    use ERC721Component::InternalTrait as ERC721InternalTrait;
    use starknet::storage::{Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess};
    use super::{Prompt, ContractAddress, IPromptHash, ClassHash};
    use starknet::{get_caller_address, get_contract_address};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use openzeppelin::upgrades::upgradeable::UpgradeableComponent;
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use openzeppelin::token::erc721::interface::{IERC721Dispatcher, IERC721DispatcherTrait};
    use core::num::traits::zero::Zero;

    #[storage]
    pub struct Storage {
        pub prompts: Map::<u256, Prompt>,
        // token_ids: Vec<u256>,
        token_id_counter: u256,
        // uses 10000 basis points, i.e. 500 means 5%
        pub fee_percentage: u256, //initialize as 500
        pub fee_wallet: ContractAddress, // initialize in constructor as well
        pub strk_address: ContractAddress,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
    }

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    #[derive(Drop, starknet::Event)]
    #[event]
    enum Event {
        PromptCreated: PromptCreated,
        PromptListed: PromptListed,
        PromptSold: PromptSold,
        FeeUpdated: FeeUpdated,
        FeeWalletUpdated: FeeWalletUpdated,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event
    }

    #[derive(Clone, Drop, starknet::Event)]
    pub struct PromptCreated {
        #[key]
        pub token_id: u256,
        #[key]
        pub creator: ContractAddress,
        pub image_url: ByteArray,
        pub description: ByteArray
    }

    #[derive(Drop, starknet::Event)]
    pub struct PromptListed {
        #[key]
        pub token_id: u256,
        #[key]
        pub seller: ContractAddress,
        pub price: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct PromptSold {
        #[key]
        pub token_id: u256,
        #[key]
        pub seller: ContractAddress,
        #[key]
        pub buyer: ContractAddress,
        pub price: u256
    }

    #[derive(Drop, starknet::Event)]
    pub struct FeeUpdated {
        pub new_fee_percentage: u256
    }

    #[derive(Drop, starknet::Event)]
    pub struct FeeWalletUpdated {
        pub new_fee_wallet: ContractAddress
    }

    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[constructor]
    fn constructor(ref self: ContractState, fee_wallet: ContractAddress, strk_address: ContractAddress, owner: ContractAddress) {
        let name: ByteArray = "PromptHash";
        let symbol: ByteArray = "PHASH";
        let base_uri: ByteArray = "https://api.example.com/v1/"; // Will be changed

        self.erc721.initializer(name, symbol, base_uri);
        // let owner = get_caller_address();
        self.ownable.initializer(owner);
        self.fee_wallet.write(fee_wallet);
        self.token_id_counter.write(1);
        self.fee_percentage.write(500);
        self.strk_address.write(strk_address);
    }

    #[abi(embed_v0)]
    pub impl PromptHashImpl of IPromptHash<ContractState> {
        fn create_prompt(ref self: ContractState, image_url: ByteArray, description: ByteArray, title: ByteArray, category: ByteArray, price: u256) -> u256 {
            let caller = get_caller_address();
            let this_contract = get_contract_address();
            let token_id = self.token_id_counter.read();
            self.token_id_counter.write(token_id + 1);

            self.erc721.mint(caller, token_id);
            self.erc721.approve(this_contract, token_id);

            let prompt = Prompt {
                id: token_id,
                image_url: image_url.clone(),
                description: description.clone(),
                price,
                for_sale: true,
                sold: false,
                owner: caller,
                category: category.clone(),
                title: title.clone()
            };

            self.prompts.entry(token_id).write(prompt);

            self.emit(
                PromptCreated {
                    token_id,
                    creator: caller,
                    image_url: image_url.clone(),
                    description: description.clone()
                }
            );

            token_id
        }

        fn get_next_token(self: @ContractState) -> u256 {
            self.token_id_counter.read()
        }

        fn list_prompt_for_sale(ref self: ContractState, token_id: u256, price: u256) {
            let caller = get_caller_address();
            assert(self.is_owner_of(caller, token_id), 'Not the owner of this prompt');
            assert(price > 0, 'Price must be greater than 0');

            let mut prompt = self.prompts.entry(token_id).read();

            assert(!prompt.sold, 'Prompt already sold');

            prompt.price = price;
            prompt.for_sale = true;

            self.prompts.entry(token_id).write(prompt);
            self.emit(
                PromptListed {
                    token_id,
                    seller: caller,
                    price
                }
            );
        }

        fn buy_prompt(ref self: ContractState, token_id: u256) {
            let caller = get_caller_address();
            let seller = self.erc721.owner_of(token_id);
            let fee_wallet = self.fee_wallet.read();
            let this_contract = get_contract_address();
            assert(!seller.is_zero(), 'Prompt does not exist');
            assert(!caller.is_zero(), 'Zero address buyer');
            let mut prompt = self.prompts.entry(token_id).read();
            assert(prompt.for_sale, 'Prompt is not for sale');
            assert(!prompt.sold, 'Prompt already sold');

            let selling_price = prompt.price;

            // Calculate fee
            let fee_percentage = self.fee_percentage.read();
            let fee = (selling_price * fee_percentage);

            let seller_amount = (selling_price * 10000) - fee;

            let strk_address = self.strk_address.read();
            let token_dispatcher = IERC20Dispatcher { contract_address: strk_address };
            let nft_dispatcher = IERC721Dispatcher { contract_address: this_contract };

            nft_dispatcher.transfer_from(seller, caller, token_id);
            token_dispatcher.transfer_from(caller, seller, seller_amount/10000);
            token_dispatcher.transfer_from(caller, fee_wallet, fee/10000);

            prompt.owner = caller;
            prompt.sold = true;

            self.emit(
                PromptSold {
                    token_id,
                    seller,
                    buyer: caller,
                    price: selling_price,
                }
            );

            self.prompts.entry(token_id).write(prompt);

        }

        fn get_all_prompts(self: @ContractState) -> Array<Prompt> {
            let prompts_counter = self.token_id_counter.read();
            let mut prompts_array = array![];

            let mut init_num = 0;
            if prompts_counter > 1 {
                init_num = 1
            }

            for i in init_num..prompts_counter {
                let prompt = self.prompts.entry(i).read();
                prompts_array.append(prompt);
            }

            prompts_array
        }

        fn set_fee_percentage(ref self: ContractState, new_fee_percentage: u256) {
            self.ownable.assert_only_owner();
            assert(new_fee_percentage < 10, 'Fee percentage cannot exceed 10');
            self.fee_percentage.write(new_fee_percentage);
            self.emit(
                FeeUpdated {
                    new_fee_percentage
                }
            );
        }

        fn set_fee_wallet(ref self: ContractState, new_fee_wallet: ContractAddress) {
            self.ownable.assert_only_owner();
            assert(!new_fee_wallet.is_zero(), 'Fee wallet cannot be 0');
            self.fee_wallet.write(new_fee_wallet);
            self.emit(
                FeeWalletUpdated {
                    new_fee_wallet
                }
            );
        }

        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalTrait {
        fn is_owner_of(ref self: ContractState, caller: ContractAddress, token_id: u256) -> bool {
            let caller = get_caller_address();
            let owner = self.erc721.owner_of(token_id);

            caller == owner
        }
    }
}