import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = function (state, action) {
  if (action.type === "ADD") {
    const totalPrice =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItem = state.items.findIndex(
      (cur) => cur.id === action.item.id
    );

    // it existing item
    if (existingItem !== -1) {
      const updatedItem = state.items[existingItem];
      const otherItems = state.items.filter((cur) => cur.id !== action.item.id);
      return {
        items: [
          ...otherItems,
          { ...updatedItem, amount: updatedItem.amount + action.item.amount },
        ],
        totalAmount: totalPrice,
      };
    }

    // if not existing item
    return {
      items: [...state.items, action.item],
      totalAmount: totalPrice,
    };
  }

  if (action.type === "REMOVE") {
    const removeItem = state.items.find((cur) => cur.id === action.id);
    const otherItems = state.items.filter((cur) => cur.id !== action.id);
    const totalPrice = state.totalAmount - removeItem.price;

    if (removeItem.amount > 1) {
      return {
        items: [
          ...otherItems,
          { ...removeItem, amount: removeItem.amount - 1 },
        ],
        totalAmount: totalPrice,
      };
    }

    return { items: [...otherItems], totalAmount: totalPrice };
  }

  if (action.type === "CLEAR") {
    return initialCartState;
  }

  return initialCartState;
};

const CartProvider = function (props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCart = function (item) {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCart = function (id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCart = function () {
    dispatchCartAction({ type: "CLEAR" });
  };
  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
