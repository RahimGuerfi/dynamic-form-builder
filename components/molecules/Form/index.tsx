import React, { useEffect } from "react";
import { useStore } from "../../../lib/store";
import { Card, CardHeader, TextMd } from "../../atoms";
import { useForm, FormProvider } from "react-hook-form";
import { isEmptyArr } from "../../../lib/helpers";
import { FormComp } from "./FormComp";

interface Props {}

const Form = (props: Props) => {
  const methods = useForm({ shouldUnregister: true });

  const { handleSubmit, reset } = methods;

  //Submit handler
  const onSubmit = (data: any) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  const { formComponents } = useStore();

  //Reset form state whenever formComponents state changes
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formComponents]);

  return (
    <Card>
      <CardHeader text="Dynamic Form" />

      <TextMd text="Your dynamic form goes here." className="mb-3" />

      {!isEmptyArr(formComponents) ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formComponents.map((component) => (
              <FormComp key={component.id} component={component} />
            ))}

            <button
              type="submit"
              className="px-5 py-2.5 mb-3 text-white bg-teal-600 hover:bg-teal-800 focus:outline-none focus:shadow-outline font-medium rounded-lg text-sm w-full text-center"
            >
              SUBMIT
            </button>
          </form>
        </FormProvider>
      ) : (
        <TextMd
          text="---You need to create at least one input---"
          className="mb-3"
        />
      )}
    </Card>
  );
};

export default Form;
