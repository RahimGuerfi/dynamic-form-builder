import React, { useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { ComponentPayload, InputTypes } from "../../../types";
import { useStore } from "../../../lib/store";
import { validateName } from "../../../lib/helpers";
import {
  Card,
  CardHeader,
  TextMd,
  TextField,
  SelectField,
  CheckboxField,
} from "../../atoms";

const DEFAULT_VALUES = {
  inputName: "",
  inputType: "" as InputTypes,
  isRequired: false,
  options: "",
};

const requireOptions = ["select", "radio"];

interface Props {}

const InputCreator = (props: Props) => {
  //Store
  const { addComponent, componentToEdit, updateComponent, formComponents } =
    useStore();

  //Populate form with the component to edit data
  useEffect(() => {
    reset(componentToEdit ? componentToEdit : DEFAULT_VALUES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentToEdit]);

  const methods = useForm<ComponentPayload>({
    defaultValues: DEFAULT_VALUES,
    shouldUnregister: true,
  });

  const { handleSubmit, reset, control } = methods;

  //Submit handler
  const onSubmit: SubmitHandler<ComponentPayload> = (data) => {
    //Edit component
    if (componentToEdit) updateComponent(componentToEdit.id, data);
    //Create component
    else addComponent(data);

    //Reset form after each submit
    reset(DEFAULT_VALUES);
  };

  //Watch inputType value
  const { inputType } = useWatch<ComponentPayload>({
    control,
  });

  return (
    <Card>
      <CardHeader text="Input Creator" />

      <TextMd
        text="This form allows you to create and update inputs."
        className="mb-3"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField<ComponentPayload>
            name="inputName"
            label="Name:"
            rules={{
              required: "Name is required.",
              validate: validateName(
                formComponents,
                componentToEdit != null,
                componentToEdit?.id
              ),
            }}
          />

          <SelectField<ComponentPayload>
            name="inputType"
            label="Type:"
            values={["textField", "checkBox", "radio", "select"]}
            rules={{
              required: "Type is required!",
            }}
          />

          {inputType && requireOptions.includes(inputType) && (
            <TextField<ComponentPayload>
              name="options"
              label="Options:"
              placeHolder="Enter options separate by ; (option1;option2;option3...)"
              rules={{
                required: "Options is required.",
              }}
            />
          )}

          <CheckboxField<ComponentPayload>
            name="isRequired"
            label="Required?"
          />

          <button
            type="submit"
            className="px-5 py-2.5 mb-3 text-white bg-teal-600 hover:bg-teal-800 focus:outline-none focus:shadow-outline font-medium rounded-lg text-sm w-full text-center"
          >
            {componentToEdit ? "UPDATE" : "CREATE"}
          </button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default InputCreator;
