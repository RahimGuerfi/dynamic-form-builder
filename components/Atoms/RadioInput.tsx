import React from "react";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  options: string[];
  register: any;
  validation?: any;
  error: FieldError | undefined;
}

export const RadioInput = ({
  label,
  name,
  options,
  register,
  validation = {},
  error,
}: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>

      {options.map((option, index) => (
        <Option
          key={index}
          option={option}
          name={name}
          register={register}
          validation={validation}
        />
      ))}

      {error && (
        <p className="font-medium text-sm text-red-600 dark:text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

interface OptionProps {
  option: string;
  name: string;
  register: any;
  validation?: any;
}
const Option = ({ option, name, register, validation = {} }: OptionProps) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="radio"
        value={option}
        {...register(name, validation)}
        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {option}
      </label>
    </div>
  );
};
