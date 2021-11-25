import style from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

function MealItemForm(props) {
  const enteredAmount = useRef();
  const [formIsValid, formIsValidHandler] = useState(true);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const inputAmount = +enteredAmount.current.value;

    if (
      inputAmount < 1 ||
      inputAmount > 5 ||
      inputAmount.toString().trim().length === 0
    ) {
      formIsValidHandler(false);
    }

    props.addToCart(inputAmount);
  };
  return (
    <form className={style.form} onSubmit={formSubmitHandler}>
      <Input
        ref={enteredAmount}
        label="Amount"
        inputAttributes={{
          type: "number",
          id: props.id,
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!formIsValid && <p>Enter a valid input</p>}
    </form>
  );
}

export default MealItemForm;
