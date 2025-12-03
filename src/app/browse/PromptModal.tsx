import Image from "next/image";
import { Prompt } from "./FetchAllPrompts";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, StarIcon } from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ERC20ABI,
  PROMPT_HASH_BNB_ADDRESS,
  PROMPT_HASH_EVM_ABI,
} from "@/lib/constants";
import { useMemo } from "react";
import { toast } from "sonner";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import { client } from "@/components/thirdwebClient";
import { bscTestnet } from "thirdweb/chains";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";

export const PromptModal = ({
  selectedPrompt,
  closeModal,
  handleImageError,
}: {
  selectedPrompt: Prompt;
  closeModal: () => void;
  handleImageError: (e: any) => void;
}) => {
  const contract = getContract({
    client: client,
    chain: bscTestnet,
    address: PROMPT_HASH_BNB_ADDRESS,
    abi: PROMPT_HASH_EVM_ABI,
  });

  const activeAccount = useActiveAccount();

  const {
    mutateAsync: buyPrompt,
    data: result,
    isPending,
    isSuccess,
  } = useSendTransaction();

  const transaction = useMemo(() => {
    if (!selectedPrompt || !activeAccount?.address) return;

    const call = prepareContractCall({
      contract,
      method: "buy",
      params: [BigInt(selectedPrompt.id)],
      value: toWei(selectedPrompt.price), // 0.0002 BNB
    });

    return call;
  }, []);

  const handleBuyPrompt = async () => {
    if (!transaction) return;

    const txHash = await buyPrompt(transaction);
    console.log("Transaction successfully sent: ", txHash);

    closeModal();
    toast.success("Prompt purchase successful");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{selectedPrompt?.title}</h2>
            <button
              onClick={closeModal}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
            <Image
              src={selectedPrompt?.imageUrl || "/images/codeguru.png"}
              alt={selectedPrompt?.title || `prompt ${selectedPrompt?.id}`}
              width={800}
              height={450}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <Badge>{selectedPrompt?.category}</Badge>
            <div className="flex items-center gap-1 text-yellow-500">
              <StarIcon className="h-4 w-4 fill-current" />
              <span>{selectedPrompt?.likes}</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">
              {selectedPrompt?.description}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Seller</h3>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                {selectedPrompt?.owner.slice(0, 2)}
              </div>
              <span className="font-mono">
                {shortenAddress(selectedPrompt?.owner!)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              {selectedPrompt?.price} BNB
            </span>
            <Button onClick={handleBuyPrompt}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
