import { useState } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface CopyButtonProps {
  text: string;
  tooltipText1?: string;
  tooltipText2?: string;
  copyText1?: string;
  copyText2?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  tooltipText1,
  tooltipText2,
  copyText1,
  copyText2,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500); // Reset the copied state after a delay
      },
      (error) => {
        console.error("Copy failed:", error);
        // Handle copy error if needed
      }
    );
  };

  return (
    <button className="absolute right-3" onClick={handleCopy}>
      {isCopied ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center p-[2px]">
                <FiCheck className="text-2xl p-1 rounded" />
                <p className="text-xs hidden lg:block">{copyText2}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText2}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/10 p-1 rounded">
                <FiClipboard className="text-xl p-[2px]" />
                <p className="text-xs hidden lg:block">{copyText1}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText1}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </button>
  );
};

export default CopyButton;
