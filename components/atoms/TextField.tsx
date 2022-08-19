import React from "react";
import {
  RegisterOptions,
  useFormContext,
  Path,
  FieldValues,
} from "react-hook-form";
import { TbAlertCircle } from "react-icons/tb";

interface Props<T> {
  name: Path<T>;
  rules?: RegisterOptions;
  label: string;
  placeHolder?: string;
}

export const TextField = <TFieldValues extends FieldValues>({
  label,
  name,
  placeHolder,
  rules = {},
}: Props<TFieldValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeHolder ? placeHolder : ""}
          {...register(name, rules)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <TbAlertCircle className="text-xl text-red-500" />
          </div>
        )}
      </div>

      {errors[name] && (
        <p className="mt-2 ml-1 font-medium text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
