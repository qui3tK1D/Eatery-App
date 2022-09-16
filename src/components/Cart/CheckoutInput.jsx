import React from "react";

const CheckoutInput = (props) => {
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id={props.label}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={props.onChangeInput}
          name={props.name}
        />
        <label
          htmlFor={props.label}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {props.label}
        </label>
      </div>
      {!props.errMsg[`${props.name}Valid`] && (
        <span className="text-red-600 text-xs">
          {props.name === "postalCode"
            ? `${props.label} must be 5 characters!`
            : `${props.label} can't be empty!`}
        </span>
      )}
    </div>
  );
};

export default CheckoutInput;
