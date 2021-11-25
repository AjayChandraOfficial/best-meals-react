import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };
const cartReducer = (prevState, dispatchObject) => {
  if (dispatchObject.type === "ADD") {
    const updatedTotalAmount =
      prevState.totalAmount +
      dispatchObject.item.price * dispatchObject.item.amount;

    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === dispatchObject.item.id
    );
    const existingCartItem = prevState.items[existingItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + dispatchObject.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(dispatchObject.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (dispatchObject.type === "REMOVE") {
    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === dispatchObject.id
    );
    const existingCartItem = prevState.items[existingItemIndex];

    const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = prevState.items.filter(
        (item) => item.id !== dispatchObject.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (dispatchObject.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dipatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dipatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dipatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dipatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemToCartHandler,
    removeItems: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
export default CartProvider;
