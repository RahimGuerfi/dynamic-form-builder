export type ComponentPayload = {
  inputName: string;
  inputType: InputTypes;
  isRequired: boolean;
  options: string;
};

export type FormComponent = {
  id: string;
} & ComponentPayload;

export type InputTypes = "textField" | "checkBox" | "radio" | "select";
