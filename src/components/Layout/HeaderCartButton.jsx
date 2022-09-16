import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartContext from "../store/cart-context";

const HeaderCartButton = function (props) {
  const [animateBtn, setAnimateBtn] = useState(false);
  const cartCtx = useContext(CartContext);

  const items = cartCtx.items.reduce((acc, cur) => acc + cur.amount, 0);
  useEffect(() => {
    if (!cartCtx.items.length) {
      return;
    }
    setAnimateBtn(true);
    const timer = setTimeout(() => {
      setAnimateBtn(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button
      className={`cart-btn group ${animateBtn ? "animate-bump" : ""}`}
      onClick={props.openModal}
    >
      <AiOutlineShoppingCart className="text-xl" />
      <span>Your Cart</span>
      <span className="cart-number">{items}</span>
    </button>
  );
};

export default HeaderCartButton;
