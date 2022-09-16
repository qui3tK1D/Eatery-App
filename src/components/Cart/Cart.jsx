import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { TiTickOutline } from "react-icons/ti";
import { BsHourglassSplit } from "react-icons/bs";

const Cart = function (props) {
  // form
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const [formValidity, setFormValidity] = useState({
    nameValid: true,
    streetValid: true,
    postalCodeValid: true,
    cityValid: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // order btn
  const [order, setOrder] = useState(false);

  // context
  const cartCtx = useContext(CartContext);
  const hasItemsInCart = cartCtx.items.length > 0;
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  // item add / remove
  const cartItemAdd = function (item) {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemove = function (id) {
    cartCtx.removeItem(id);
  };

  const handleOrder = function () {
    setOrder(true);
  };

  // helper
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;
  // form
  const handleChange = function (e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });

    const currentField = e.target.name;

    if (currentField === "name") {
      setFormValidity((prevFormValidity) => ({
        ...prevFormValidity,
        nameValid: !isEmpty(e.target.value),
      }));
    } else if (currentField === "street") {
      setFormValidity((prevFormValidity) => ({
        ...prevFormValidity,
        streetValid: !isEmpty(e.target.value),
      }));
    } else if (currentField === "postalCode") {
      setFormValidity((prevFormValidity) => ({
        ...prevFormValidity,
        postalCodeValid: isFiveChars(e.target.value),
      }));
    } else if (currentField === "city") {
      setFormValidity((prevFormValidity) => ({
        ...prevFormValidity,
        cityValid: !isEmpty(e.target.value),
      }));
    }
  };

  const handleConfirm = async function (e) {
    // check if any input is valid
    const nameIsValid = !isEmpty(formData.name);
    const streetIsValid = !isEmpty(formData.street);
    const postalCodeIsValid = isFiveChars(formData.postalCode);
    const cityIsValid = !isEmpty(formData.city);

    setFormValidity({
      nameValid: nameIsValid,
      streetValid: streetIsValid,
      postalCodeValid: postalCodeIsValid,
      cityValid: cityIsValid,
    });

    if (!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      await fetch(
        "https://react-http-e5acb-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: formData, orderedMeals: cartCtx.items }),
        }
      );
    } catch (err) {
      console.log(err.message);
    }
    setSubmitted(true);
    setIsSubmitting(false);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className="max-h-60 overflow-x-auto scrollbar-hide">
      {cartCtx.items.map((cur) => (
        <CartItem
          key={cur.id}
          id={cur.id}
          name={cur.name}
          price={cur.price}
          amount={cur.amount}
          onAdd={cartItemAdd.bind(null, cur)}
          onRemove={cartItemRemove.bind(null, cur.id)}
        />
      ))}
    </ul>
  );

  const defaultContent = (
    <>
      {!order && cartItems}

      {order && (
        <Checkout handleChange={handleChange} formValidation={formValidity} />
      )}

      <div className="font-medium text-xl flex items-center justify-between my-5">
        <h3>Total Amount</h3>
        <span className="font-medium">${totalAmount}</span>
      </div>
      <div className="text-right space-x-4">
        <button className="cancelOrderBtn" onClick={props.closeModal}>
          Close
        </button>
        {hasItemsInCart && !order && (
          <button className="orderBtn" onClick={handleOrder}>
            Order
          </button>
        )}

        {order && (
          <button type="submit" className="orderBtn" onClick={handleConfirm}>
            Confirm
          </button>
        )}
      </div>
    </>
  );

  const submittingContent = (
    <p className="text-slate-700 userFeedBack">
      Sending order data <BsHourglassSplit />
    </p>
  );
  const successSubmittedContent = (
    <p className="text-green-600 userFeedBack">
      Successfully sent the orders
      <TiTickOutline className="bg-green-600 text-white rounded-full" />
    </p>
  );

  return (
    <Modal closeModal={props.closeModal}>
      {isSubmitting && submittingContent}
      {!isSubmitting && submitted && successSubmittedContent}
      {!isSubmitting && !submitted && defaultContent}
    </Modal>
  );
};

export default Cart;
