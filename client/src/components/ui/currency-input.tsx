import * as React from "react";
import { Input } from "@/components/ui/input";

interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "type"> {
  value: string;
  onChange: (value: string) => void;
}

function formatCurrency(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
}

function toRawDigits(formatted: string): string {
  return formatted.replace(/[^\d]/g, "");
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const display = value ? formatCurrency(value) : "";

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = toRawDigits(e.target.value);
      onChange(raw);
    }

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
