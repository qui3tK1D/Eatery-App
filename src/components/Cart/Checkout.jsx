import React from "react";
import CheckoutInput from "./CheckoutInput";

const Checkout = (props) => {
  const input = [
    {
      id: 1,
      label: "Your Name",
      name: "name",
    },
    {
      id: 2,
      label: "Street",
      name: "street",
    },
    {
      id: 3,
      label: "Postal Code",
      name: "postalCode",
    },
    {
      id: 4,
      label: "City",
      name: "city",
    },
  ];

  return (
    <form className="flex flex-col rounded space-y-3">
      {input.map((cur) => (
        <CheckoutInput
          key={cur.id}
          label={cur.label}
          onChangeInput={props.handleChange}
          name={cur.name}
          errMsg={props.formValidation}
        />
      ))}
    </form>
  );
};

export default Checkout;
