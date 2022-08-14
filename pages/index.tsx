import type { NextPage } from "next";
import InputCreator from "../components/InputCreator";
import FormLayout from "../components/FormLayout";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-3xl text-center text-green-700">Hello World</h1>
      <InputCreator />
      <hr />
      <FormLayout />
    </>
  );
};

export default Home;
