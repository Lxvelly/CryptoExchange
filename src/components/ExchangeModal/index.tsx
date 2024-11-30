import { useState } from "react";
import styles from "./styles.module.scss";

export interface ExchangeModalProps {
  active?: boolean;
  price: number;
  name?: string;
  setActive?: any;
  symbol?: string;
}

export const ExchangeModal = (props: ExchangeModalProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
    const convertUSD = event.target.value / props.price;
    setCalculatedPrice(convertUSD);
  };

  const clearInput = () => {
    setCalculatedPrice(0);
    setValue("");
  };

  return (
    <div
      className={
        styles.Modal + " " + (props.active ? styles.Modal__active : " ")
      }
      onClick={() => (
        props.setActive(false),
        (document.body.style.overflow = "auto"),
        clearInput()
      )}
    >
      <div
        className={
          styles.Modal__content +
          " " +
          (props.active ? styles.Modal__content__active : " ")
        }
      >
        <div
          className={styles.Modal__content__text}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Change USD to {props.name}</h1>
          <input
            className={styles.Modal__content__form__input}
            value={value}
            onChange={handleChange}
          ></input>{" "}
          USD
          <p className={styles.Modal__content__form__input__name}>
            {calculatedPrice} {props.symbol}
          </p>
          <button
            onClick={() => (
              props.setActive(false),
              (document.body.style.overflow = "auto"),
              clearInput()
            )}
            className={styles.Modal__closebtn}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
