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
