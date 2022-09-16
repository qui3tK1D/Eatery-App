import React from "react";

const Card = function (props) {
  return (
    <div
      className={`bg-white text-slate-700 p-2 rounded-lg max-w-4xl mx-auto   shadow-lg ${props.style}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
