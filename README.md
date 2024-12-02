# 🔐 Login con Formity y Shadcn UI

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge">
</div>

## 📋 Índice de Contenidos
- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Configuración Inicial](#-configuración-inicial)
- [Instalación de Dependencias](#️-instalación-de-dependencias)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Implementación paso a paso](#-implementación-paso-a-paso)
  - [Configuración de Formity](#-configuración-de-formity)
  - [Creación de Componentes](#-creación-de-componentes)
  - [Validaciones](#-validaciones)
- [Mejoras Futuras](#-mejoras-futuras)

## 📝 Descripción del Proyecto
Este proyecto es un ejemplo de implementación de un login utilizando un conjunto de tecnologías potentes:

🚀 [Formity](https://www.formity.app/): Una librería para crear formularios dinámicos y altamente personalizables.(!)

⚡ [Shadcn UI](https://tailwindcss.com/): Librería de componentes de React para interfaces de usuario rápidas y elegantes

🔒 [React Hook Form](https://react-hook-form.com/): Una librería de React para formularios eficientes y flexibles

🎨 [Tailwind CSS](https://tailwindcss.com/): Un framework de CSS para crear interfaces de usuario rápidas y personalizables

El proyecto está pensado para ser un punto de partida en el desarrollo de formularios dinámicos, personalizables y rápidos de implementar.

## 🛠️ Configuración Inicial

### Instalación de Dependencias

Las dependencias necesarias para este proyecto son:

```bashCopy
npm install formity expry react-hook-form
```

```bashCopy
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```bashCopy
npx shadcn@latest init
```

#### Componentes específicos de Shadcn UI

```bashCopy
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add button
```

## Estructura del Proyecto
Esta es la estructura de carpetas y archivos del proyecto:
```bash
📂 src/
│
├── 🧩 components/                  # Componentes reutilizables 
│   ├── 📝 formity/                 # Componentes adaptados para Formity
│   │   ├── 🔤 fields/              # Campos de formulario personalizados
│   │   │   ├── text-field.tsx      # Campo de texto adaptado
│   │   ├── 📋 form-layout.tsx      # Estructura base de formularios
│   │   └── 🚀 form.tsx             # Formulario principal que utilizar React-Hook-Forms
│   │
│   └── 🎨 ui/                      # Componentes de UI (Shadcn)
│
├── 🔐 features/                    # Funcionalidades específicas
│   ├── 🔒 auth/                    # Módulo de autenticación
│   │   ├── 📊 components/          # Componentes de autenticación (debe seguir la estructura de Formity)
│   │   │   └── signUpComponents.tsx
│   │   ├── 🔍 schemas/             # Esquemas del formulario (debe seguir la estructura de Formity)
│   │   │   └── signUpSchema.ts
│   │   └── 📊 types/               # Tipos específicos
│   │       └── SignUp.ts
│   │
│   ├── 🛠 lib/                     # Utilidades y helpers
│   │   └── utils.ts
│   │
│   ├── 📄 pages/                   # Páginas de la aplicación
│   │   └── SignUp.tsx
│   │
│   ├── 🚦 routes/                  # Configuración de rutas
│   │   └── index.tsx
│   │
│   └── 📱 App.tsx                  # Componente raíz
```

#### 🚧 NOTA:
Todos los componentes utilizados pueden ser:

* 🔧 Personalizados según necesidades específicas

* 🛠 Modificados para ajustarse a requerimientos del proyecto

* 📦 Adaptados sin restricciones

La estructura de carpetas y archivos es **sugerida** y puede ser modificada según las necesidades del proyecto.

Pero es importante mantener la estructura de Formity para que los componentes de Shadcn UI funcionen correctamente.

## Implementación Paso a Paso: Formulario de Registro 🚀
Este será un ejemplo paso a paso de un formulario sencillo de registro de usuario. Está enfocado en la creación del formulario, su validación y personalización, no en la funcionalidad de autenticación en sí.

### 🧩 Conceptos Fundamentales de Formity
Formity como dice su documentación, se basa en tres conceptos principales:

#### Components 🧱

* Componentes de React que representan campos de formulario
* Altamente personalizables y reutilizables


#### Schema 📝

* Define la estructura y comportamiento del formulario
* Establece valores por defecto, validaciones y renderizado
* Utiliza `expry`, una herramienta que permite crear lógica dinámica con JSON de forma simple y flexible


#### onReturn 🔄

* Función ejecutada al enviar el formulario
* Maneja la lógica de procesamiento de datos

### 📝 Página de Registro: Punto de Entrada
#### SignUp.tsx

Lo primero que necesitamos es un punto de entrada para nuestro formulario. Será la página de registro de usuario.

```tsx
// src/pages/SignUp.tsx
import { Formity } from 'formity';
import schema from "@/features/auth/schemas/signUpSchema";
import components from "@/features/auth/components/signUpComponents";

export const SignUp = () => {
  // Función para manejar los datos del formulario
  const onReturn = (result: unknown) => console.log('Form submitted', result);

  return (
    <Formity 
      schema={schema}             // Esquema del formulario
      components={components}    // Componentes personalizados
      onReturn={onReturn}       // Función de retorno 
    />
  );
};
```

Como se puede ver, el componente `Formity` recibe tres propiedades que debemos crear, por lo que ahora nos toca definir el esquema y los componentes.

#### Esquema de Registro (signUpSchema.ts)

```tsx
// src/features/auth/schemas/signUpSchema.ts
import { Schema } from 'formity';

const schema: Schema = {
  {
    form: { // this is the form schema
      defaultValues: { // these are the default values for the form
        firstName: ["", []],
      },
      resolver: { // this is the resolver for the form, it is used to validate the form
        // firstName: [
        //   [{ "#$ne": ["#$firstName", ""] }, "Required"], // this means that name does not equal an empty string
        //   [{ "#$lt": [{ "#$strLen": "#$firstName" }, 20] }, "No more than 20 chars"], // this means that the length of name is less than 20
        // ]
      },
      render: { // this is the render for the form, it is used to render the form
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: { // these are the children of the form
            formLayout: { // this is the form layout, we can configure here the heading and description of the form
              heading: "Sign Up",
              description: "Please fill out the form to sign up.",
              fields: [ // these are the fields of the form, we need to specify the type of the field and the name of the field
                {
                  textField: {
                    name: "firstName",
                    label: "First Name",
                  },
                },
              ],
              button: {
                next: { text: "Sign Up" }
              }
            }
          }
        }
      }
    }
  },
  {
    return: {
      firstName: "$firstName",
    }
  }
];

export default schema;
}
```

#### Componentes de Registro (signUpComponents.tsx) 🛠️
El archivo `signUpComponents.tsx` debe ser un **componente genérico** que en la medida de lo posible:
* 🔄 Funcione para cualquier formulario
* 🛠 No requiera modificaciones para proyectos diferentes
* 🧰 Sea completamente adaptable mediante esquemas

Ejemplo práctico de un componente genérico:
```bash
Componente Genérico -> Esquema Específico = Formulario Personalizado
TextField Genérico + Esquema de Login = Formulario de Login
TextField Genérico + Esquema de Registro = Formulario de Registro
```

##### 🚀 Beneficios
* Mantenibilidad: Un solo archivo de componentes
* Flexibilidad: Cambiar funcionalidad sin tocar código
* Escalabilidad: Crear nuevos formularios sin esfuerzo

```bash
💡 Consejo: Invierte tiempo en crear componentes genéricos, ahorrarás mucho trabajo después.
```

```tsx
// src/features/auth/components/signUpComponents.tsx
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
```

### 🔒 Validaciones
Las validaciones en Formity se realizan mediante el esquema del formulario. En el archivo `signUpSchema.ts` se pueden definir las validaciones necesarias para cada campo.

Formity tiene su sistema de validación propio, basado en `expry`, y esta se hace por medio de un objeto `resolver` en el esquema.

```tsx
// src/features/auth/schemas/signUpSchema.ts
resolver: {
  firstName: [
    [{ "#$ne": ["#$firstName", ""] }, "Required"], // this means that name does not equal an empty string
    [{ "#$lt": [{ "#$strLen": "#$firstName" }, 20] }, "No more than 20 chars"], // this means that the length of name is less than 20
 ]
},

// y en el render del formulario
resolver: "$resolver",
```

Para más información sobre las validaciones y cómo implementarlas, puedes consultar la [documentación de Formity](https://www.formity.app/docs/form-schema/form).

## 📦 Mejoras Futuras
Este proyecto es un punto de partida para el desarrollo de formularios dinámicos y personalizables. Algunas mejoras futuras que se pueden implementar son:

* 📝 **Internacionalización**: Implementar un sistema de traducción para los formularios
* 📱 **Responsive Design**: Añadir estilos y componentes específicos para dispositivos móviles
* 📊 **Más Campos**: Crear componentes para campos específicos como fechas, direcciones, etc.
* 🚀 **Mejoras en la Validación**: Migrar las validaciones actuales a *Zod* ó *Yup*, para obtener una mayor flexibilidad y facilidad de uso.
* Documentación extendida: Crear una documentación más detallada que incluya ejemplos de uso, flujos de trabajo sugeridos y mejores prácticas.

## 🛠️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/RKamey/login-formity-shadcn.git
cd login-formity-shadcn
```

Instalar dependencias:

### Con bun
```bashCopy
bun install
```
  
### Con npm
```bashCopy
npm install
```

### Con yarn

```bashCopy
yarn install
```

## 🚀 Uso
Para iniciar el servidor de desarrollo:

### Con bun
```bashCopy
bun run dev
```

### Con npm
```bashCopy
npm run dev
```

### Con yarn

```bashCopy
yarn dev
```

Abre tu navegador en http://localhost:5173

## 🔗 Recursos Adicionales
* [Formity](https://www.formity.app/)
* [Shadcn UI](https://ui.shadcn.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Expry](https://www.expry.dev/)
* [Zod](https://zod.dev/)
* [Yup](https://github.com/jquense/yup)

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para más detalles.