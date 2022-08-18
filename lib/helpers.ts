import { FormComponent } from "../types";

export const isEmptyArr = (arr: any[]): boolean => {
  return arr.length === 0;
};

//Check if the passed name is used in array
export const isNameUsed = (
  arr: FormComponent[],
  name: string,
  checkId: boolean,
  id?: string
) =>
  checkId
    ? arr.some((item) => item.inputName === name && item.id !== id)
    : arr.some((item) => item.inputName === name);

//Name validation function
export const validateName = (
  arr: FormComponent[],
  checkId: boolean,
  id?: string
) => {
  return function (name: string) {
    return !isNameUsed(arr, name, checkId, id) || "Name must be unique.";
  };
};
