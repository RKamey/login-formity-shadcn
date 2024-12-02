import { Schema } from "formity";

const schema: Schema = [
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
              heading: "Sign In",
              description: "Please fill out the form to sign in.",
              fields: [ // these are the fields of the form, we need to specify the type of the field and the name of the field
                {
                  textField: {
                    name: "firstName",
                    label: "First Name",
                  },
                },
              ],
              button: {
                next: { text: "Sign In" }
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