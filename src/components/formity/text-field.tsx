import { ChangeEvent, useId } from "react";
import {
  FormControl,
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  type?: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: { message: string };
}

export default function TextField({ 
  type = 'text', 
  label, 
  value, 
  onChange, 
  error 
}: TextFieldProps) {
  const id = useId();

  return (
    <FormItem>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
          }}
          className={cn(
            "focus-visible:ring-offset-2",
            { "border-destructive focus-visible:ring-destructive": error }
          )}
        />
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
}