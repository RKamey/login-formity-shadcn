import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
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
  className?: string;
}

export default function TextField({
  type = 'text',
  name,
  label,
  className,
}: TextFieldProps) {
  const id = useId();
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormControl>
            <Input
              id={id}
              type={type}
              {...field}
              placeholder={label}
              className={cn(className, { 'input-error': error })}
            />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}