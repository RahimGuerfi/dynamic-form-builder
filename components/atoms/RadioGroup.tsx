import React from "react";
import {
  RegisterOptions,
  useFormContext,
  Path,
  FieldValues,
} from "react-hook-form";

interface Props<T> {
  name: Path<T>;
  rules?: RegisterOptions;
  label: string;
  values: string[];
}

interface OptionProps {
  value: string;
}

export const RadioGroup = <TFieldValues extends FieldValues>({
  label,
  name,
  rules = {},
  values,
}: Props<TFieldValues>) => {
  const RadioInput = ({ value }: OptionProps) => {
    return (
      <div className="flex items-center mb-4">
        <input
          type="radio"
          value={value}
          {...register(name, rules)}
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {value}
        </label>
      </div>
    );
  };

  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>

      {values.map((value, index) => (
        <RadioInput key={index} value={value} />
      ))}

      {errors[name] && (
        <p className="font-medium text-sm text-red-600 dark:text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
