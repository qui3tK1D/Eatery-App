import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";

const App = function () {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = function () {
    setShowModal(false);
  };

  const handleOpenModal = function () {
    setShowModal(true);
  };

  return (
    <CartProvider>
      {showModal && <Cart closeModal={handleCloseModal} />}
      <Header openModal={handleOpenModal} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
