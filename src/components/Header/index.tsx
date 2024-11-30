import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <h1 className={styles.Header__h1}>CRYPTOEXCHANGE</h1>
      <p className={styles.Header__p}>
        Pick a coin from below and exchange it!
      </p>
      <div className={styles.Header__buttons}>
        <button className={styles.Header__buttons__btn}>
          <Link to="/main" className={styles.Header__buttons__btn__text}>
            exchange
          </Link>
        </button>
        <button className={styles.Header__buttons__btn}>
          <Link to="/watchlist" className={styles.Header__buttons__btn__text}>
            watchlist
          </Link>
        </button>
      </div>
    </div>
  );
};
