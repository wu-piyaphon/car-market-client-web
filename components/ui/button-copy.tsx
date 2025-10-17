"use client";

import { Copy } from "lucide-react";
import type { ComponentProps } from "react";
import { toast } from "sonner";
import { Button } from "./button";

type ButtonClipboardProps = ComponentProps<typeof Button> & {
  text: string;
  successText?: string;
};

export default function ButtonClipboard({
  text,
  successText = "Copied to clipboard!",
  ...props
}: ButtonClipboardProps) {
  return (
    <Button
      type="button"
      aria-label="Copy to clipboard"
      title="Click to copy"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success(successText);
      }}
      {...props}
    >
      {text}
      <Copy />
    </Button>
  );
}
