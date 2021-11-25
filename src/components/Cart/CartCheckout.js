import style from "./CartCheckout.module.css";
import { useRef, useState } from "react";
const CartCheckout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    pincode: true,
    address: true,
    phone: true,
    city: true,
  });
  const isEmpty = (value) => value.trim() === "";
  const isValidPin = (value) => value.trim().length === 6;
  const isValidPhone = (value) => value.trim().length === 10;

  const nameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();
  const pincodeRef = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredPincode = pincodeRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPinIsValid = isValidPin(enteredPincode);
    const enteredPhoneIsValid = isValidPhone(enteredPhone);

    setFormValidity({
      name: enteredNameIsValid,
      pincode: enteredPinIsValid,
      address: enteredAddressIsValid,
      phone: enteredPhoneIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredAddressIsValid &&
      enteredPinIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }

    props.onCheckout({
      name: enteredName,
      pincode: enteredPincode,
      address: enteredAddress,
      phone: enteredPhone,
      city: enteredCity,
    });
  };
  const nameControlClasses = `${style.control} ${
    formValidity.name ? "" : style.invalid
  }`;

  const addressControlClasses = `${style.control} ${
    formValidity.address ? "" : style.invalid
  }`;
  const phoneControlClasses = `${style.control} ${
    formValidity.phone ? "" : style.invalid
  }`;
  const cityControlClasses = `${style.control} ${
    formValidity.city ? "" : style.invalid
  }`;
  const pincodeControlClasses = `${style.control} ${
    formValidity.pincode ? "" : style.invalid
  }`;
  //Submit Cart Data
  return (
    <form onSubmit={formSubmitHandler} className={style.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input id="nameRef" type="text" ref={nameRef} />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="ph">Phone Number</label>
        <input id="ph" type="number" ref={phoneRef} />
        {!formValidity.phone && <p>Please enter a valid phone number</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input id="address" type="text" ref={addressRef} />
        {!formValidity.address && <p>Please enter a valid address</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityRef} />
        {!formValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={pincodeControlClasses}>
        <label htmlFor="pincode">Pin Code</label>
        <input id="pincode" ref={pincodeRef} />
        {!formValidity.pincode && <p>Please enter a valid pincode</p>}
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};
export default CartCheckout;
