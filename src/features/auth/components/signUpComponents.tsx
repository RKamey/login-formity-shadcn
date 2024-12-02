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
  textField: ({ name, label }) => (
    <TextField name={name} label={label} /> 
  ),
  next: ({ text }) => <Button type="submit">{text}</Button>
}

export default components;