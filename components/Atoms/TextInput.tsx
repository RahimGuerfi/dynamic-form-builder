import React from "react";
import { FieldError } from "react-hook-form";
import { TbAlertCircle } from "react-icons/tb";

interface Props {
  label: string;
  name: string;
  placeHolder?: string;
  register: any;
  validation?: any;
  error: FieldError | undefined;
}

export const TextInput = ({
  label,
  name,
  placeHolder,
  register,
  validation = {},
  error,
}: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeHolder ? placeHolder : ""}
          {...register(name, validation)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <TbAlertCircle className="text-xl text-red-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 ml-1 font-medium text-sm text-red-600 dark:text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};
