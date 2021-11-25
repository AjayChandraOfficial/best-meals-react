import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CartCheckout from "./CartCheckout";
import { useState } from "react/cjs/react.development";
function Cart(props) {
  const [orderButtonClicked, setOrderButtonClicked] = useState(false);
  const [orderIsSubmitting, setOrderIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItems(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const renderCartItems = cartCtx.items.map((item) => (
    <CartItem
      id={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    ></CartItem>
  ));
  const orderHandler = () => {
    setOrderButtonClicked(true);
  };
  const cartActions = (
    <div className={style.actions}>
      <button
        className={style["button--alt"]}
        onClick={props.cartHandler.hideCart}
      >
        Close
      </button>
      {hasItems && (
        <button className={style.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setOrderIsSubmitting(true);
    await fetch(
      "https://reactmealsdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setOrderIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const totalAmount = `₹${Math.abs(cartCtx.totalAmount.toFixed(2))}`;

  const cartModalContent = (
    <Fragment>
      <ul className={style["cart-items"]}>{renderCartItems}</ul>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderButtonClicked && (
        <CartCheckout
          onClose={props.cartHandler.hideCart}
          onCheckout={submitOrderHandler}
        />
      )}
      {!orderButtonClicked && cartActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Submitting order data</p>;
  const isSubmittedModalContent = (
    <Fragment>
      <p>Order sent successfully</p>
      <div className={style.actions}>
        <button className={style.button} onClick={props.cartHandler.hideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal cartHandler={props.cartHandler}>
      {!orderIsSubmitting && !didSubmit && cartModalContent}
      {orderIsSubmitting && isSubmittingModalContent}
      {didSubmit && !orderIsSubmitting && isSubmittedModalContent}
    </Modal>
  );
}

export default Cart;
