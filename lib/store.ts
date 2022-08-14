import create from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { FormComponent, ComponentPayload } from "../types";

// Standard crud functions
const addComponent = (
  formComponents: FormComponent[],
  payload: ComponentPayload
): FormComponent[] => [
  ...formComponents,
  {
    id: uuidv4(),
    ...payload,
  },
];

const updateComponent = (
  formComponents: FormComponent[],
  id: string,
  payload: ComponentPayload
): FormComponent[] =>
  formComponents.map((comp) => {
    return comp.id === id ? { id: comp.id, ...payload } : comp;
  });

const removeComponent = (
  formComponents: FormComponent[],
  id: string
): FormComponent[] => formComponents.filter((comp) => comp.id !== id);

// Zustand implementation
type Store = {
  formComponents: FormComponent[];
  componentToEdit: FormComponent | null;
  setComponentToEdit: (component: FormComponent | null) => void;
  addComponent: (payload: ComponentPayload) => void;
  updateComponent: (id: string, payload: ComponentPayload) => void;
  removeComponent: (id: string) => void;
  removeAll: () => void;
};

const useStore = create<Store>()(
  devtools((set) => ({
    // Initial state
    formComponents: [],
    componentToEdit: null,
    // Methods for manipulating state
    setComponentToEdit: (component: FormComponent | null) =>
      set((state) => ({
        ...state,
        componentToEdit: component,
      })),
    addComponent: (payload: ComponentPayload) =>
      set((state) => ({
        ...state,
        formComponents: addComponent(state.formComponents, payload),
      })),
    updateComponent: (id: string, payload: ComponentPayload) =>
      set((state) => ({
        ...state,
        componentToEdit: null,
        formComponents: updateComponent(state.formComponents, id, payload),
      })),
    removeComponent: (id: string) =>
      set((state) => ({
        ...state,
        formComponents: removeComponent(state.formComponents, id),
      })),
    removeAll: () =>
      set((state) => ({
        ...state,
        formComponents: [],
      })),
  }))
);

export { useStore };
