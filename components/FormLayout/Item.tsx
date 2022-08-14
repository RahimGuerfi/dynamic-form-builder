import React from "react";
import { useStore } from "../../lib/store";
import { FormComponent } from "../../types";

interface Props {
  data: FormComponent;
}

const Item = ({ data }: Props) => {
  const { removeComponent, componentToEdit, setComponentToEdit } = useStore();

  //Remove component from store
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this?")) {
      removeComponent(data.id);
      if (componentToEdit?.id === data.id) setComponentToEdit(null);
    }
  };

  //Set component to edit
  const toggleEdit = () => {
    if (componentToEdit?.id === data.id) setComponentToEdit(null);
    else setComponentToEdit(data);
  };

  return (
    <div>
      <p>{data.inputName}</p>
      <button onClick={toggleEdit}>
        {componentToEdit?.id === data.id ? "CANCEL EDIT" : "EDIT"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Item;
