import type { NextPage } from "next";
import InputCreator from "../components/InputCreator";
import FormLayout from "../components/FormLayout";

const Home: NextPage = () => {
  return (
    <main>
      <section className="text-white text-center pt-4 mb-10">
        <h1 className="font-medium leading-tight text-5xl">Form Builder</h1>
        <h5 className="font-medium leading-tight text-xl">
          Build your own form.
        </h5>
      </section>

      <section className="flex flex-wrap items-start justify-center gap-5 mb-10">
        <FormLayout />
        <InputCreator />
      </section>
    </main>
  );
};

export default Home;
