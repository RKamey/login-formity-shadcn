import { Schema } from "formity";

const schema: Schema = [
  {
    form: { // this is the form schema
      defaultValues: { // these are the default values for the form
        firstName: ["", []],
        age: [18, []],
        jobs: [[], []]
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
                    className: "input-text"
                  },
                },
                {
                  numberField: {
                    name: "age",
                    label: "Age",
                    min: 18,
                    max: 100,
                    step: 1,
                    className: "input-number"
                  }
                },
                {
                  selectField: {
                    placeholder: "Select a job",
                    width: "w-full",
                    // staticOptions: [
                    //   { value: "developer", label: "Developer" },
                    //   { value: "designer", label: "Designer" },
                    //   { value: "manager", label: "Manager" }
                    // ],
                    fetchOptions: null,
                    endpoint: "https://mis.alfapcsmax.com/admtramites/public/api/puestos",
                    fetchConfig: {
                      responseKey: "data",
                      labelKey: "nombre",
                      valueKey: "id"
                    },
                    onValueChange: null,
                    multiple: false,
                    searchable: false,
                    disabled: false
                  }
                }
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
      age: "$age",
      jobs: "$jobs"
    }
  }
];

export default schema;