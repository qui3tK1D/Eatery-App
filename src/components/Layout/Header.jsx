import React from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header = function (props) {
  return (
    <>
      <header className="header">
        <h1 className="text-xl md:text-2xl font-thin text-gray-100">
          Corner Eatery
        </h1>
        <HeaderCartButton openModal={props.openModal} />
      </header>
    </>
  );
};

export default Header;
