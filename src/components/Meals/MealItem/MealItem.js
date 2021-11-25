import { useContext } from "react";
import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;
  const addToCart = (amount) => {
    cartCtx.addItems({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addToCart={addToCart} />
      </div>
    </li>
  );
}

export default MealItem;
