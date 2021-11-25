import React from "react";
//Initialization of default data in context

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItems(item) {},
  removeItems(id) {},
  clearCart() {},
});

export default CartContext;
