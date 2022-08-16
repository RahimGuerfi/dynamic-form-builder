import React from "react";

interface Props {
  text: string;
}

export const CardHeader = ({ text }: Props) => {
  return (
    <div className="flex items-center mb-3">
      <div className="flex-grow bg-teal-600 h-0.5"></div>
      <div className="flex-grow-0 mx-5 font-medium leading-tight text-2xl text-teal-600">
        {text}
      </div>
      <div className="flex-grow bg-teal-600 h-0.5"></div>
    </div>
  );
};
