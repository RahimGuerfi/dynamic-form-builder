import React from "react";

interface Props {
  text: string;
  className?: string;
}

export const TextMd = ({ text, className }: Props) => {
  return (
    <p
      className={`font-medium text-center text-gray-900 ${
        className ? className : ""
      }`}
    >
      {text}
    </p>
  );
};
