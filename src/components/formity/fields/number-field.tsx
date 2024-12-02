import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";

interface NumberFieldProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function NumberField({
  name,
  label,
  min,
  max,
  step = 1,
  className
}: NumberFieldProps) {
  const id = useId();
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormControl>
            <Input
              id={id}
              type="number"
              onChange={(e) => { onChange(Number(e.target.value)) }}
              min={min}
              max={max}
              step={step}
              {...field}
              placeholder={label}
              className={cn(
                className
              )}
            />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}