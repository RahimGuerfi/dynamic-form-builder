import React from "react";
import { useStore } from "../../../lib/store";
import Item from "./Item";
import { isEmptyArr } from "../../../lib/helpers";
import { FormComponent } from "../../../types";
import { Reorder } from "framer-motion";
import { Card, CardHeader, TextMd } from "../../atoms";

interface Props {}

const FormLayout = (props: Props) => {
  const { formComponents, removeAll, reorderComponents } = useStore();

  //Remove all components from store
  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all fields?")) removeAll();
  };

  //Handle items reorder
  const handleReorder = (newList: FormComponent[]) => {
    reorderComponents(newList);
  };

  return (
    <Card>
      <CardHeader text="2. Form layout" />

      <TextMd
        text="This allows you to edit, remove and reorder form fields."
        className="mb-3"
      />

      {!isEmptyArr(formComponents) ? (
        <>
          <Reorder.Group values={formComponents} onReorder={handleReorder}>
            {formComponents.map((comp) => (
              <Item key={comp.id} data={comp} />
            ))}
          </Reorder.Group>
          <button
            className="px-5 py-2.5 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:shadow-outline font-medium rounded-lg text-sm text-center float-right"
            onClick={() => handleDeleteAll()}
          >
            DELETE ALL
          </button>
        </>
      ) : (
        <TextMd
          text="---You need to create at least one input---"
          className="mb-3"
        />
      )}
    </Card>
  );
};

export default FormLayout;
