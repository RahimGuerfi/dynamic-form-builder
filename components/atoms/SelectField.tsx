import React from "react";
import {
  useFormContext,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface Props<TFormValues> {
  name: Path<TFormValues>;
  label: string;
  values: string[];
  rules?: RegisterOptions;
}

export const SelectField = <TFieldValues extends FieldValues>({
  name,
  label,
  values,
  rules = {},
}: Props<TFieldValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <select
        {...register(name, rules)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose...</option>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 ml-1 font-medium text-sm text-red-600 dark:text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
