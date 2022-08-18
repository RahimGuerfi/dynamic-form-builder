import React from "react";
import { useStore } from "../../../lib/store";
import {
  Card,
  CardHeader,
  TextMd,
  TextField,
  SelectField,
  CheckboxField,
  RadioGroup,
} from "../../atoms";
import { useForm, FormProvider } from "react-hook-form";
import { FormComponent } from "../../../types";
import { isEmptyArr } from "../../../lib/helpers";

interface Props {}

const Form = (props: Props) => {
  const methods = useForm({ shouldUnregister: true });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  //Return form field component
  const formField = (component: FormComponent): JSX.Element => {
    const rules = component.isRequired
      ? { required: `${component.inputName} is required!` }
      : {};
    switch (component.inputType) {
      case "textField":
        return (
          <TextField
            key={component.inputName}
            label={component.inputName}
            name={component.inputName}
            rules={rules}
          />
        );
      case "checkBox":
        return (
          <CheckboxField
            key={component.inputName}
            label={component.inputName}
            name={component.inputName}
            rules={rules}
          />
        );
      case "select":
        return (
          <SelectField
            key={component.inputName}
            label={component.inputName}
            name={component.inputName}
            rules={rules}
            values={component.options?.split(";")}
          />
        );
      case "radio":
        return (
          <RadioGroup
            key={component.inputName}
            label={component.inputName}
            name={component.inputName}
            rules={rules}
            values={component.options?.split(";")}
          />
        );
    }
  };

  const { formComponents } = useStore();
  return (
    <Card>
      <CardHeader text="Dynamic Form" />

      <TextMd text="Your dynamic form goes here." className="mb-3" />
      {!isEmptyArr(formComponents) && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formComponents.map((component) => formField(component))}

            <button
              type="submit"
              className="px-5 py-2.5 mb-3 text-white bg-teal-600 hover:bg-teal-800 focus:outline-none focus:shadow-outline font-medium rounded-lg text-sm w-full text-center"
            >
              SUBMIT
            </button>
          </form>
        </FormProvider>
      )}
    </Card>
  );
};

export default Form;
