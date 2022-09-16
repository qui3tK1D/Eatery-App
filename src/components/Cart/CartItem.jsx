import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartItem = (props) => (
  <li
    key={props.id}
    className="flex justify-between items-center pb-5 mb-4 border-b border-emerald-800"
  >
    <div className="space-y-2">
      <h2 className="font-medium text-lg text-slate-900">{props.name}</h2>
      <div className="space-x-12">
        <span className="priceBadge">${props.price}</span>
        <span className="squareBorderBtn border-slate-900 text-sm font-medium">
          x{props.amount}
        </span>
      </div>
    </div>
    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
      <button className="plusItemBtn" onClick={props.onRemove}>
        <AiOutlineMinus />
      </button>
      <button className="plusItemBtn" onClick={props.onAdd}>
        <AiOutlinePlus />
      </button>
    </div>
  </li>
);

export default CartItem;
