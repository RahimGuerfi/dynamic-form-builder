import React from "react";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  register: any;
  validation?: any;
  error: FieldError | undefined;
}

export const CheckBox = ({
  label,
  name,
  register,
  validation = {},
  error,
}: Props) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            {...register(name, validation)}
            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
        </div>
        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-2 font-medium text-sm text-red-600 dark:text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};
