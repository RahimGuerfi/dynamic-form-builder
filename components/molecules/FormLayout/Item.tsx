import React from "react";
import { useStore } from "../../../lib/store";
import { FormComponent } from "../../../types";
import { Reorder } from "framer-motion";
import { TbEditOff, TbEdit, TbTrash, TbGripVertical } from "react-icons/tb";
import { TextMd } from "../../atoms";

interface Props {
  data: FormComponent;
}

const Item = ({ data }: Props) => {
  const { removeComponent, componentToEdit, setComponentToEdit } = useStore();

  //Return if current component is being edited
  const isEditing = () => componentToEdit?.id === data.id;

  //Remove component from store
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this?")) {
      if (isEditing()) setComponentToEdit(null);
      removeComponent(data.id);
    }
  };

  //Set component to edit
  const toggleEdit = () => {
    if (isEditing()) setComponentToEdit(null);
    else setComponentToEdit(data);
  };

  return (
    <Reorder.Item
      whileDrag={{ opacity: 0.85, transition: { duration: 0.15 } }}
      className={`p-3 mb-3 transition-[background] duration-500 rounded-lg flex justify-between items-center cursor-grab shadow ${
        isEditing() ? "bg-gray-200" : "bg-gray-100"
      }`}
      value={data}
    >
      <div className="flex items-center justify-center gap-2">
        <TbGripVertical className="text-teal-600" size="24px" />
        <TextMd text={data.inputName} />
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleEdit}
          className="p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600"
        >
          {isEditing() ? <TbEditOff size="24px" /> : <TbEdit size="24px" />}
        </button>
        <button
          onClick={handleDelete}
          className="p-1 focus:outline-none focus:shadow-outline text-red-600 hover:text-red-800"
        >
          <TbTrash size="24px" />
        </button>
      </div>
    </Reorder.Item>
  );
};

export default Item;
