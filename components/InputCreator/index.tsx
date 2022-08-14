import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ComponentPayload, InputTypes } from "../../types";
import { useStore } from "../../lib/store";

const DEFAULT_VALUES = {
  inputName: "",
  inputType: "textField" as InputTypes,
  isRequired: false,
  options: "",
};

const multipleOptionsInputs = ["select", "radio"];

interface Props {}

const InputCreator = (props: Props) => {
  const { addComponent, componentToEdit, updateComponent } = useStore();

  //Populate form with the component to edit data
  useEffect(() => {
    reset(componentToEdit ? componentToEdit : DEFAULT_VALUES);
  }, [componentToEdit]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ComponentPayload>({
    defaultValues: DEFAULT_VALUES,
    shouldUnregister: true,
  });

  const watchInputType = watch("inputType"); //Track input type values

  //submit handler
  const onSubmit: SubmitHandler<ComponentPayload> = (data) => {
    //Edit component
    if (componentToEdit) updateComponent(componentToEdit.id, data);
    //Create component
    else addComponent(data);

    //Reset form after each submit
    reset(DEFAULT_VALUES);
  };

  return (
    <div className="text-black">
      <h1>Input Creator</h1>
      <p>
        This form allows you to create and update inputs. The Generate Form
        button will create a new form with the updates.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input type="text" {...register("inputName", { required: true })} />
        <br />
        {errors.inputName && <p>This is required.</p>}

        <label>Type:</label>
        <select {...register("inputType")}>
          <option value="textField">Text Field</option>
          <option value="checkBox">Checkbox</option>
          <option value="radio">Radio Button</option>
          <option value="select">Select Input</option>
        </select>
        <br />
        {multipleOptionsInputs.includes(watchInputType) && (
          <>
            <label>Options:</label>
            <input
              type="text"
              placeholder="Enter options separate by ;"
              {...register("options", { required: true })}
            />
            <br />
            {errors.options && <p>This is required.</p>}
          </>
        )}
        <br />
        <label>Required: </label>
        <input type="checkbox" {...register("isRequired")} />
        <br />

        <input type="submit" value={componentToEdit ? "UPDATE" : "CREATE"} />
      </form>
    </div>
  );
};

export default InputCreator;
