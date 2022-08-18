import React from "react";
import { FormComponent } from "../../../types";
import { TextField, SelectField, CheckboxField, RadioGroup } from "../../atoms";

interface Props {
  component: FormComponent;
}

export const FormComp = ({ component }: Props) => {
  //Create rules object based on isRequired variable
  const rules = component.isRequired
    ? { required: `${component.inputName} is required!` }
    : { required: false };

  //Generate and return component based on inputType
  switch (component.inputType) {
    case "textField":
      return (
        <TextField
          label={component.inputName}
          name={component.inputName}
          rules={rules}
        />
      );
    case "checkBox":
      return (
        <CheckboxField
          label={component.inputName}
          name={component.inputName}
          rules={rules}
        />
      );
    case "select":
      return (
        <SelectField
          label={component.inputName}
          name={component.inputName}
          rules={rules}
          values={component.options.split(";")}
        />
      );
    case "radio":
      return (
        <RadioGroup
          label={component.inputName}
          name={component.inputName}
          rules={rules}
          values={component.options.split(";")}
        />
      );
  }
};
