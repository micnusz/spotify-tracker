import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Spinner({ ...props }) {
  return (
    <div className={cn("w-full h-full mt-3")} {...props}>
      <Loader2 className="animate-spin" />
    </div>
  );
}
