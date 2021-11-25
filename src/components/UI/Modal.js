import { Fragment } from "react";
import style from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
  const backdropClickHandler = function () {
    //Add props function here to execute on click of backdrop
    props.cartHandler && props.cartHandler.hideCart();
  };
  return <div className={style.backdrop} onClick={backdropClickHandler}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={style.modal}>
      <div>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  const overlayElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop cartHandler={props.cartHandler} />,
        overlayElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayElement
      )}
    </Fragment>
  );
}

export default Modal;
