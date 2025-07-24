"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  title?: string;
}

export function CopyButton({
  textToCopy,
  className,
  variant = "outline",
  size = "sm",
  title = "Copy",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleCopy}
    >
      {isCopied ? (
        <span className="flxe flex-row gap-x-2">
          <CheckIcon className="h-[2rem] w-[2rem]" />
          Copied!
        </span>
      ) : (
        <span className="flex flex-row gap-x-2">
          <CopyIcon className=" h-[2rem] w-[2rem]" />
          {title}
        </span>
      )}
    </Button>
  );
}
