import type {
  Components,
  DefaultValues,
  OnNext,
  Resolver,
  Step
} from "formity";
import type { Value } from "expry";

import { Fragment } from "react";

import Form from "@/components/formity/form";
import FormLayout from "@/components/formity/form-layout";
import TextField from "@/components/formity/fields/text-field";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/formity/fields/number-field";
import SelectField, { SelectGroupConfig, SelectOption } from "@/components/formity/fields/select-field";

import '@/styles/inputs.css';

// Estos son los parametros que se le van a pasar a los componentes
// solo se deben definir los que se requieren en el formulario
type Parameters = {
  form: {
    step: Step,
    defaultValues: DefaultValues
    resolver: Resolver;
    onNext: OnNext;
    children: Value;
  },
  formLayout: {
    heading: string;
    description: string;
    fields: Value[];
    button: Value;
  },
  textField: {
    name: string;
    label: string;
    className?: string;
  },
  numberField: {
    name: string;
    label: string;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
  },
  selectField: {
    placeholder?: string;
    className?: string;
    width?: string;
    staticOptions?: SelectOption[] | SelectGroupConfig[];
    fetchOptions?: () => Promise<unknown>;
    endpoint?: string;
    fetchConfig?: {
      responseKey?: string;
      labelKey?: string;
      valueKey?: string;
    };
    onValueChange?: (value: string | string[]) => void;
    multiple?: boolean;
    searchable?: boolean;
    disabled?: boolean;
  },
  next: {
    text: string;
  }
}

// Se definen los componentes que se van a utilizar en el formulario
const components: Components<Parameters> = {
  form: ({ step, defaultValues, resolver, onNext, children }, render) => (
    <Form
      step={step}
      defaultValues={defaultValues}
      resolver={resolver}
      onNext={onNext}
      >
      {render(children)}
    </Form>
  ),
  formLayout: ({ heading, fields, description, button }, render) => (
    <FormLayout
      heading={heading}
      description={description}
      fields={fields.map((field, index) => (
        <Fragment key={index}>{render(field)}</Fragment>
      ))}
      button={render(button)}
    />
  ),
  textField: ({ name, label, className }) => (
    <TextField 
      name={name} 
      label={label} 
      className={className}
    />
  ),
  numberField: ({ name, label, min, max, step, className }) => (
    <NumberField
      name={name}
      label={label}
      min={min}
      max={max}
      step={step}
      className={className}
    />
  ),
  selectField: ({ placeholder, width, staticOptions, fetchOptions, endpoint, fetchConfig, onValueChange, multiple, searchable, disabled }) => (
    <SelectField
      key={1}
      placeholder={placeholder}
      width={width}
      staticOptions={staticOptions}
      fetchOptions={fetchOptions}
      endpoint={endpoint}
      fetchConfig={fetchConfig}
      onValueChange={onValueChange}
      multiple={multiple}
      searchable={searchable}
      disabled={disabled}
    />
  ),
  next: ({ text }) => <Button type="submit">{text}</Button>
}

export default components;