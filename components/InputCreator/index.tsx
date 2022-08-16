import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ComponentPayload, InputTypes } from "../../types";
import { useStore } from "../../lib/store";
import { isNameUsed } from "../../lib/helpers";
import { Card, CardHeader, TextMd } from "../Atoms";

const DEFAULT_VALUES = {
  inputName: "",
  inputType: "textField" as InputTypes,
  isRequired: false,
  options: "",
};

const multipleOptionsInputs = ["select", "radio"];

interface Props {}

const InputCreator = (props: Props) => {
  const { addComponent, componentToEdit, updateComponent, formComponents } =
    useStore();

  //Populate form with the component to edit data
  useEffect(() => {
    reset(componentToEdit ? componentToEdit : DEFAULT_VALUES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const validateName = (name: string) =>
    !isNameUsed(
      formComponents,
      name,
      componentToEdit != null,
      componentToEdit?.id
    ) || "Name must be unique.";

  return (
    <Card>
      <CardHeader text="Input Creator" />

      <TextMd
        text="This form allows you to create and update inputs."
        className="mb-3"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Name:
          </label>
          <input
            type="text"
            {...register("inputName", {
              required: "This is required.",
              validate: validateName,
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.inputName && (
            <p className="mt-2 ml-1 font-medium text-sm text-red-600 dark:text-red-500">
              {errors.inputName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Type:
          </label>
          <select
            {...register("inputType")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="textField">Text Field</option>
            <option value="checkBox">Checkbox</option>
            <option value="radio">Radio Button</option>
            <option value="select">Select Input</option>
          </select>
        </div>

        {multipleOptionsInputs.includes(watchInputType) && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Options:
            </label>
            <input
              type="text"
              placeholder="Enter options separate by ;"
              {...register("options", { required: "This is required." })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.options && (
              <p className="mt-2 ml-1 font-medium text-sm text-red-600 dark:text-red-500">
                {errors.options.message}
              </p>
            )}
          </div>
        )}

        <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              {...register("isRequired")}
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Required?
          </label>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 mb-3 text-white bg-teal-600 hover:bg-teal-800 focus:outline-none focus:shadow-outline font-medium rounded-lg text-sm w-full text-center"
        >
          {componentToEdit ? "UPDATE" : "CREATE"}
        </button>
      </form>
    </Card>
  );
};

export default InputCreator;
