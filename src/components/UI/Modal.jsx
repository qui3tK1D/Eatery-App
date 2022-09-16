import React from "react";
import { createPortal } from "react-dom";

const Backdrop = function (props) {
  return (
    <div
      className="fixed top-0 w-screen h-screen bg-black/60 z-20"
      onClick={props.closeModal}
    />
  );
};

const ModalOverlay = function (props) {
  return (
    <div className="bg-white w-11/12 md:w-8/12 xl:w-6/12 p-6 rounded-lg fixed top-1/3 left-1/2 z-30 -translate-y-1/4 -translate-x-1/2 shadow-2xl animate-slideTop">
      {props.children}
    </div>
  );
};

const Modal = function (props) {
  return (
    <>
      {createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("overlay")
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;
