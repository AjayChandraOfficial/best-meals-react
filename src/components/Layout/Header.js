import style from "./Header.module.css";
import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>BestMeals</h1>
        <HeaderCartButton cartHandler={props.cartHandler} />
      </header>
      <div className={style.image}>
        <img src={mealsImage} alt="Table full of delicious food" />
      </div>
    </Fragment>
  );
}

export default Header;
