import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShown, showCartHandler] = useState(false);

  const cartHandler = {
    showCart: function () {
      showCartHandler(true);
    },
    hideCart: function () {
      showCartHandler(false);
    },
  };
  return (
    <CartProvider>
      {cartShown && <Cart cartHandler={cartHandler}></Cart>}
      <Header cartHandler={cartHandler}></Header>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
