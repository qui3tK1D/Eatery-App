import React, { useContext, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import CartContext from "../../store/cart-context";
import Input from "../../UI/Input";

const MealItem = function (props) {
  const cartCtx = useContext(CartContext);
  const itemAmount = useRef();
  const addItem = function (e) {
    e.preventDefault();

    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: +itemAmount.current.value,
    });

    itemAmount.current.value = "1";
  };

  return (
    <li className="mealList">
      <div className="space-y-1">
        <h2 className="mealTitle">{props.name}</h2>
        <p>{props.description}</p>
        <p className="priceBadge">${props.price}</p>
      </div>

      <form className="flex flex-col" onSubmit={addItem}>
        <Input
          wrapperStyle={"space-x-2 md:space-x-4"}
          labelId={`amount${props.id}`}
          ref={itemAmount}
          label="Amount"
          labelStyle="font-medium"
          input={{
            type: "number",
            className:
              "border border-emerald-900 rounded-lg w-12 pl-2 focus:outline-none",
            min: "1",
            max: "5",
            defaultValue: "1",
            step: "1",
          }}
        />

        <button className="addItemBtn">
          <FaCartPlus />
          <p>Add to Cart</p>
        </button>
      </form>
    </li>
  );
};

export default MealItem;
