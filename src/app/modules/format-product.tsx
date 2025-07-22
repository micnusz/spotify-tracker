"use client";

import { Badge } from "@/components/ui/badge";
import { JSX } from "react";

const formatProductName = (product: string): JSX.Element => {
  const formattedProduct =
    product.charAt(0).toUpperCase() + product.slice(1).toLowerCase();

  if (product.toLowerCase() === "premium") {
    return (
      <span>
        <Badge variant="premium">{formattedProduct}</Badge>
      </span>
    );
  }

  if (product.toLowerCase() === "free") {
    return (
      <span>
        <Badge variant="free">{formattedProduct}</Badge>
      </span>
    );
  }
  return (
    <span>
      <Badge variant="outline">{formattedProduct}</Badge>
    </span>
  );
};

export default formatProductName;
