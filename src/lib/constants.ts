// export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0xff81a132718aae9eb9daba3717ffbfb1ef5f717c3445a8def27ba7a8318f70';
// export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0x1eae4807c2a1f4c3fadf21b04eb3d0d9466773d50385c83c1ab475dc5142e55';
// export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0x49035f903a70bb2fc8a070e0f8d684ff3ac81c730b70aed7587bce8dab972c6';
// export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0x6c86de5435c04069966cac89708fef1d47dd9b954a24f422f3b191d85f2b6e4';
// export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0x4162e6efd25542d2c4858ab72d1cf40776767d23990a8d9daceab9da65097b1';
// export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0x735c6eb2c996292cef2ebcd19f81c38674d827a30b0c1de50c56c443a9c174e';
export const PROMPTHASH_STARKNET_ADDRESS: `0x${string}` = '0x39bc3d2b454b30fef221aaad8e0d20e546c352d13ee6c3546e269594bef554b';

export const STARGATE_STRK_ADDRESS: `0x${string}` = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D'

export const PROMPTHASH_STARKNET_ABI = [
  {
    "type": "impl",
    "name": "PromptHashImpl",
    "interface_name": "prompt_hash_starknet::IPromptHash"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "prompt_hash_starknet::Prompt",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "name": "image_url",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "description",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "price",
        "type": "core::integer::u256"
      },
      {
        "name": "for_sale",
        "type": "core::bool"
      },
      {
        "name": "sold",
        "type": "core::bool"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "category",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "title",
        "type": "core::byte_array::ByteArray"
      }
    ]
  },
  {
    "type": "interface",
    "name": "prompt_hash_starknet::IPromptHash",
    "items": [
      {
        "type": "function",
        "name": "create_prompt",
        "inputs": [
          {
            "name": "image_url",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "description",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "title",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "category",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "price",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_next_token",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "list_prompt_for_sale",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          },
          {
            "name": "price",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "buy_prompt",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_all_prompts",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<prompt_hash_starknet::Prompt>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "set_fee_percentage",
        "inputs": [
          {
            "name": "new_fee_percentage",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_fee_wallet",
        "inputs": [
          {
            "name": "new_fee_wallet",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "upgrade",
        "inputs": [
          {
            "name": "new_class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC721MixinImpl",
    "interface_name": "openzeppelin_token::erc721::interface::ERC721ABI"
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc721::interface::ERC721ABI",
    "items": [
      {
        "type": "function",
        "name": "balance_of",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "owner_of",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "safe_transfer_from",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transfer_from",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_approval_for_all",
        "inputs": [
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "approved",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_approved",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "is_approved_for_all",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "supports_interface",
        "inputs": [
          {
            "name": "interface_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "token_uri",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "approved",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getApproved",
        "inputs": [
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "fee_wallet",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "strk_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "prompt_hash_starknet::PromptHash::PromptCreated",
    "kind": "struct",
    "members": [
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "creator",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "image_url",
        "type": "core::byte_array::ByteArray",
        "kind": "data"
      },
      {
        "name": "description",
        "type": "core::byte_array::ByteArray",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "prompt_hash_starknet::PromptHash::PromptListed",
    "kind": "struct",
    "members": [
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "seller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "price",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "prompt_hash_starknet::PromptHash::PromptSold",
    "kind": "struct",
    "members": [
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "seller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "buyer",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "price",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "prompt_hash_starknet::PromptHash::FeeUpdated",
    "kind": "struct",
    "members": [
      {
        "name": "new_fee_percentage",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "prompt_hash_starknet::PromptHash::FeeWalletUpdated",
    "kind": "struct",
    "members": [
      {
        "name": "new_fee_wallet",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    "kind": "struct",
    "members": [
      {
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        "kind": "nested"
      },
      {
        "name": "OwnershipTransferStarted",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
    "kind": "struct",
    "members": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "approved",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "operator",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "approved",
        "type": "core::bool",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Transfer",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
        "kind": "nested"
      },
      {
        "name": "Approval",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
        "kind": "nested"
      },
      {
        "name": "ApprovalForAll",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_introspection::src5::SRC5Component::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    "kind": "struct",
    "members": [
      {
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Upgraded",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "prompt_hash_starknet::PromptHash::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "PromptCreated",
        "type": "prompt_hash_starknet::PromptHash::PromptCreated",
        "kind": "nested"
      },
      {
        "name": "PromptListed",
        "type": "prompt_hash_starknet::PromptHash::PromptListed",
        "kind": "nested"
      },
      {
        "name": "PromptSold",
        "type": "prompt_hash_starknet::PromptHash::PromptSold",
        "kind": "nested"
      },
      {
        "name": "FeeUpdated",
        "type": "prompt_hash_starknet::PromptHash::FeeUpdated",
        "kind": "nested"
      },
      {
        "name": "FeeWalletUpdated",
        "type": "prompt_hash_starknet::PromptHash::FeeWalletUpdated",
        "kind": "nested"
      },
      {
        "name": "OwnableEvent",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "ERC721Event",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::Event",
        "kind": "flat"
      },
      {
        "name": "SRC5Event",
        "type": "openzeppelin_introspection::src5::SRC5Component::Event",
        "kind": "flat"
      },
      {
        "name": "UpgradeableEvent",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        "kind": "flat"
      }
    ]
  }
] as const;

export const ERC20ABI = [
    {
        type: 'impl',
        name: 'LockingContract',
        interface_name: 'src::mintable_lock_interface::ILockingContract',
    },
    {
        type: 'interface',
        name: 'src::mintable_lock_interface::ILockingContract',
        items: [
            {
                type: 'function',
                name: 'set_locking_contract',
                inputs: [
                    {
                        name: 'locking_contract',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'get_locking_contract',
                inputs: [],
                outputs: [
                    {
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                state_mutability: 'view',
            },
        ],
    },
    {
        type: 'impl',
        name: 'LockAndDelegate',
        interface_name: 'src::mintable_lock_interface::ILockAndDelegate',
    },
    {
        type: 'struct',
        name: 'core::integer::u256',
        members: [
            {
                name: 'low',
                type: 'core::integer::u128',
            },
            {
                name: 'high',
                type: 'core::integer::u128',
            },
        ],
    },
    {
        type: 'interface',
        name: 'src::mintable_lock_interface::ILockAndDelegate',
        items: [
            {
                type: 'function',
                name: 'lock_and_delegate',
                inputs: [
                    {
                        name: 'delegatee',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'lock_and_delegate_by_sig',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'delegatee',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                    {
                        name: 'nonce',
                        type: 'core::felt252',
                    },
                    {
                        name: 'expiry',
                        type: 'core::integer::u64',
                    },
                    {
                        name: 'signature',
                        type: 'core::array::Array::<core::felt252>',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'MintableToken',
        interface_name: 'src::mintable_token_interface::IMintableToken',
    },
    {
        type: 'interface',
        name: 'src::mintable_token_interface::IMintableToken',
        items: [
            {
                type: 'function',
                name: 'permissioned_mint',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'permissioned_burn',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'MintableTokenCamelImpl',
        interface_name: 'src::mintable_token_interface::IMintableTokenCamel',
    },
    {
        type: 'interface',
        name: 'src::mintable_token_interface::IMintableTokenCamel',
        items: [
            {
                type: 'function',
                name: 'permissionedMint',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'permissionedBurn',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'Replaceable',
        interface_name: 'src::replaceability_interface::IReplaceable',
    },
    {
        type: 'struct',
        name: 'core::array::Span::<core::felt252>',
        members: [
            {
                name: 'snapshot',
                type: '@core::array::Array::<core::felt252>',
            },
        ],
    },
    {
        type: 'struct',
        name: 'src::replaceability_interface::EICData',
        members: [
            {
                name: 'eic_hash',
                type: 'core::starknet::class_hash::ClassHash',
            },
            {
                name: 'eic_init_data',
                type: 'core::array::Span::<core::felt252>',
            },
        ],
    },
    {
        type: 'enum',
        name: 'core::option::Option::<src::replaceability_interface::EICData>',
        variants: [
            {
                name: 'Some',
                type: 'src::replaceability_interface::EICData',
            },
            {
                name: 'None',
                type: '()',
            },
        ],
    },
    {
        type: 'enum',
        name: 'core::bool',
        variants: [
            {
                name: 'False',
                type: '()',
            },
            {
                name: 'True',
                type: '()',
            },
        ],
    },
    {
        type: 'struct',
        name: 'src::replaceability_interface::ImplementationData',
        members: [
            {
                name: 'impl_hash',
                type: 'core::starknet::class_hash::ClassHash',
            },
            {
                name: 'eic_data',
                type: 'core::option::Option::<src::replaceability_interface::EICData>',
            },
            {
                name: 'final',
                type: 'core::bool',
            },
        ],
    },
    {
        type: 'interface',
        name: 'src::replaceability_interface::IReplaceable',
        items: [
            {
                type: 'function',
                name: 'get_upgrade_delay',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u64',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'get_impl_activation_time',
                inputs: [
                    {
                        name: 'implementation_data',
                        type: 'src::replaceability_interface::ImplementationData',
                    },
                ],
                outputs: [
                    {
                        type: 'core::integer::u64',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'add_new_implementation',
                inputs: [
                    {
                        name: 'implementation_data',
                        type: 'src::replaceability_interface::ImplementationData',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'remove_implementation',
                inputs: [
                    {
                        name: 'implementation_data',
                        type: 'src::replaceability_interface::ImplementationData',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'replace_to',
                inputs: [
                    {
                        name: 'implementation_data',
                        type: 'src::replaceability_interface::ImplementationData',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'AccessControlImplExternal',
        interface_name: 'src::access_control_interface::IAccessControl',
    },
    {
        type: 'interface',
        name: 'src::access_control_interface::IAccessControl',
        items: [
            {
                type: 'function',
                name: 'has_role',
                inputs: [
                    {
                        name: 'role',
                        type: 'core::felt252',
                    },
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'get_role_admin',
                inputs: [
                    {
                        name: 'role',
                        type: 'core::felt252',
                    },
                ],
                outputs: [
                    {
                        type: 'core::felt252',
                    },
                ],
                state_mutability: 'view',
            },
        ],
    },
    {
        type: 'impl',
        name: 'RolesImpl',
        interface_name: 'src::roles_interface::IMinimalRoles',
    },
    {
        type: 'interface',
        name: 'src::roles_interface::IMinimalRoles',
        items: [
            {
                type: 'function',
                name: 'is_governance_admin',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'is_upgrade_governor',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'register_governance_admin',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'remove_governance_admin',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'register_upgrade_governor',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'remove_upgrade_governor',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'renounce',
                inputs: [
                    {
                        name: 'role',
                        type: 'core::felt252',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'ERC20Impl',
        interface_name: 'openzeppelin::token::erc20::interface::IERC20',
    },
    {
        type: 'interface',
        name: 'openzeppelin::token::erc20::interface::IERC20',
        items: [
            {
                type: 'function',
                name: 'name',
                inputs: [],
                outputs: [
                    {
                        type: 'core::felt252',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'symbol',
                inputs: [],
                outputs: [
                    {
                        type: 'core::felt252',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'decimals',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u8',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'total_supply',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'balance_of',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'allowance',
                inputs: [
                    {
                        name: 'owner',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'spender',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'transfer',
                inputs: [
                    {
                        name: 'recipient',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'transfer_from',
                inputs: [
                    {
                        name: 'sender',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'recipient',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'approve',
                inputs: [
                    {
                        name: 'spender',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'ERC20CamelOnlyImpl',
        interface_name: 'openzeppelin::token::erc20::interface::IERC20CamelOnly',
    },
    {
        type: 'interface',
        name: 'openzeppelin::token::erc20::interface::IERC20CamelOnly',
        items: [
            {
                type: 'function',
                name: 'totalSupply',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'balanceOf',
                inputs: [
                    {
                        name: 'account',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'transferFrom',
                inputs: [
                    {
                        name: 'sender',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'recipient',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [
                    {
                        type: 'core::bool',
                    },
                ],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'constructor',
        name: 'constructor',
        inputs: [
            {
                name: 'name',
                type: 'core::felt252',
            },
            {
                name: 'symbol',
                type: 'core::felt252',
            },
            {
                name: 'decimals',
                type: 'core::integer::u8',
            },
            {
                name: 'initial_supply',
                type: 'core::integer::u256',
            },
            {
                name: 'recipient',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'permitted_minter',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'provisional_governance_admin',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'upgrade_delay',
                type: 'core::integer::u64',
            },
        ],
    },
    {
        type: 'function',
        name: 'increase_allowance',
        inputs: [
            {
                name: 'spender',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'added_value',
                type: 'core::integer::u256',
            },
        ],
        outputs: [
            {
                type: 'core::bool',
            },
        ],
        state_mutability: 'external',
    },
    {
        type: 'function',
        name: 'decrease_allowance',
        inputs: [
            {
                name: 'spender',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'subtracted_value',
                type: 'core::integer::u256',
            },
        ],
        outputs: [
            {
                type: 'core::bool',
            },
        ],
        state_mutability: 'external',
    },
    {
        type: 'function',
        name: 'increaseAllowance',
        inputs: [
            {
                name: 'spender',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'addedValue',
                type: 'core::integer::u256',
            },
        ],
        outputs: [
            {
                type: 'core::bool',
            },
        ],
        state_mutability: 'external',
    },
    {
        type: 'function',
        name: 'decreaseAllowance',
        inputs: [
            {
                name: 'spender',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'subtractedValue',
                type: 'core::integer::u256',
            },
        ],
        outputs: [
            {
                type: 'core::bool',
            },
        ],
        state_mutability: 'external',
    },
    {
        type: 'event',
        name: 'src::strk::erc20_lockable::ERC20Lockable::Transfer',
        kind: 'struct',
        members: [
            {
                name: 'from',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'to',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'value',
                type: 'core::integer::u256',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::strk::erc20_lockable::ERC20Lockable::Approval',
        kind: 'struct',
        members: [
            {
                name: 'owner',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'spender',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'value',
                type: 'core::integer::u256',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::replaceability_interface::ImplementationAdded',
        kind: 'struct',
        members: [
            {
                name: 'implementation_data',
                type: 'src::replaceability_interface::ImplementationData',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::replaceability_interface::ImplementationRemoved',
        kind: 'struct',
        members: [
            {
                name: 'implementation_data',
                type: 'src::replaceability_interface::ImplementationData',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::replaceability_interface::ImplementationReplaced',
        kind: 'struct',
        members: [
            {
                name: 'implementation_data',
                type: 'src::replaceability_interface::ImplementationData',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::replaceability_interface::ImplementationFinalized',
        kind: 'struct',
        members: [
            {
                name: 'impl_hash',
                type: 'core::starknet::class_hash::ClassHash',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::access_control_interface::RoleGranted',
        kind: 'struct',
        members: [
            {
                name: 'role',
                type: 'core::felt252',
                kind: 'data',
            },
            {
                name: 'account',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'sender',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::access_control_interface::RoleRevoked',
        kind: 'struct',
        members: [
            {
                name: 'role',
                type: 'core::felt252',
                kind: 'data',
            },
            {
                name: 'account',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'sender',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::access_control_interface::RoleAdminChanged',
        kind: 'struct',
        members: [
            {
                name: 'role',
                type: 'core::felt252',
                kind: 'data',
            },
            {
                name: 'previous_admin_role',
                type: 'core::felt252',
                kind: 'data',
            },
            {
                name: 'new_admin_role',
                type: 'core::felt252',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::roles_interface::GovernanceAdminAdded',
        kind: 'struct',
        members: [
            {
                name: 'added_account',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'added_by',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::roles_interface::GovernanceAdminRemoved',
        kind: 'struct',
        members: [
            {
                name: 'removed_account',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'removed_by',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::roles_interface::UpgradeGovernorAdded',
        kind: 'struct',
        members: [
            {
                name: 'added_account',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'added_by',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::roles_interface::UpgradeGovernorRemoved',
        kind: 'struct',
        members: [
            {
                name: 'removed_account',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'removed_by',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'src::strk::erc20_lockable::ERC20Lockable::Event',
        kind: 'enum',
        variants: [
            {
                name: 'Transfer',
                type: 'src::strk::erc20_lockable::ERC20Lockable::Transfer',
                kind: 'nested',
            },
            {
                name: 'Approval',
                type: 'src::strk::erc20_lockable::ERC20Lockable::Approval',
                kind: 'nested',
            },
            {
                name: 'ImplementationAdded',
                type: 'src::replaceability_interface::ImplementationAdded',
                kind: 'nested',
            },
            {
                name: 'ImplementationRemoved',
                type: 'src::replaceability_interface::ImplementationRemoved',
                kind: 'nested',
            },
            {
                name: 'ImplementationReplaced',
                type: 'src::replaceability_interface::ImplementationReplaced',
                kind: 'nested',
            },
            {
                name: 'ImplementationFinalized',
                type: 'src::replaceability_interface::ImplementationFinalized',
                kind: 'nested',
            },
            {
                name: 'RoleGranted',
                type: 'src::access_control_interface::RoleGranted',
                kind: 'nested',
            },
            {
                name: 'RoleRevoked',
                type: 'src::access_control_interface::RoleRevoked',
                kind: 'nested',
            },
            {
                name: 'RoleAdminChanged',
                type: 'src::access_control_interface::RoleAdminChanged',
                kind: 'nested',
            },
            {
                name: 'GovernanceAdminAdded',
                type: 'src::roles_interface::GovernanceAdminAdded',
                kind: 'nested',
            },
            {
                name: 'GovernanceAdminRemoved',
                type: 'src::roles_interface::GovernanceAdminRemoved',
                kind: 'nested',
            },
            {
                name: 'UpgradeGovernorAdded',
                type: 'src::roles_interface::UpgradeGovernorAdded',
                kind: 'nested',
            },
            {
                name: 'UpgradeGovernorRemoved',
                type: 'src::roles_interface::UpgradeGovernorRemoved',
                kind: 'nested',
            },
        ],
    },
] as const;