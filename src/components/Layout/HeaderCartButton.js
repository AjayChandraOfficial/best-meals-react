import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import { useEffect, useState } from "react";
function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext); //Entire component will be reevaluated when context changes
  const { items } = cartCtx;
  const [btnHighlighted, setButtonHighlighted] = useState(false);
  useEffect(() => {
    if (items.length === 0) return;
    setButtonHighlighted(true);
    const timer = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const totalCartValue = items.reduce(
    (currVal, item) => currVal + item.amount,
    0
  );

  const btnClasses = `${style.button} ${btnHighlighted ? style.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.cartHandler.showCart}>
      <span className={style.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={style.quantity}>{totalCartValue}</span>
    </button>
  );
}

export default HeaderCartButton;
