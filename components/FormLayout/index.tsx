import React from "react";
import { useStore } from "../../lib/store";
import Item from "./Item";
import { isEmptyArr } from "../../lib/helpers";

interface Props {}

const FormLayout = (props: Props) => {
  const { formComponents, removeAll, setComponentToEdit } = useStore();

  //Remove all components from store
  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all fields?")) {
      removeAll();
      setComponentToEdit(null);
    }
  };

  return (
    <div>
      {formComponents.map((comp) => (
        <Item key={comp.id} data={comp} />
      ))}
      {!isEmptyArr(formComponents) && (
        <button onClick={() => handleDeleteAll()}>Delete All</button>
      )}
    </div>
  );
};

export default FormLayout;
