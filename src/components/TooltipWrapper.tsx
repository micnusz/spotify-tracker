"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type TooltipWrapperProps = {
  trigger: string;
  content: string;
};

const TooltipWrapper = ({ trigger, content }: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
