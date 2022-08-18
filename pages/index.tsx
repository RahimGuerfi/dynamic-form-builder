import type { NextPage } from "next";
import InputCreator from "../components/molecules/InputCreator";
import FormLayout from "../components/molecules/FormLayout";
import Form from "../components/molecules/Form";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dynamic Form Builder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <section className="text-white text-center pt-4 mb-10">
          <h1 className="font-medium leading-tight text-5xl">Form Builder</h1>
          <h5 className="font-medium leading-tight text-xl">
            Build your own form.
          </h5>
        </section>

        <section className="flex flex-wrap items-start justify-center gap-5 mb-10 px-3">
          <InputCreator />
          <FormLayout />
          <Form />
        </section>
      </main>
    </>
  );
};

export default Home;
