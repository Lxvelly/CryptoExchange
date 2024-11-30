import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ExchangeModal } from "../ExchangeModal";

export const WatchListPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrice, setSelcetedPrice] = useState(0);
  const [selectedName, setSelectedName] = useState<string>();
  const [selectedSymbol, setSelectedSymbol] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempLikes = localStorage.getItem("tokens");
        if (!tempLikes) {
          console.error("No tokens found in localStorage");
          return;
        }
        const likesArray = JSON.parse(tempLikes);
        const likesString = likesArray.join(",");
        const resp = await axios.get(
          `https://api.coinlore.net/api/ticker/?id=${likesString}`
        );
        const coins = resp.data;
        setData(coins);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const HandleExchangeClick = (name: string, price: string, symbol: string) => {
    const coinPrice = Number(price);
    setSelcetedPrice(coinPrice);
    setSelectedName(name);
    setSelectedSymbol(symbol);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const CheckPositive = (percent: string) => {
    if (Number(percent) > 0) {
      return true;
    } else {
      return false;
    }
  };

  const saveLikes = (tokens: unknown[]) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  };

  const getLikes = () => {
    const saved = localStorage.getItem("tokens");
    return saved ? JSON.parse(saved) : [];
  };

  const [likes, setLikes] = useState(getLikes());

  const addToken = (newToken: unknown) => {
    const updatedLikes = [...likes, newToken];
    setLikes(updatedLikes);
    saveLikes(updatedLikes);
  };

  const removeToken = (tokenToRemove: unknown) => {
    const updatedLikes = likes.filter(
      (token: unknown) => token !== tokenToRemove
    );
    setLikes(updatedLikes);
    saveLikes(updatedLikes);
  };

  useEffect(() => {
    saveLikes(likes);
  }, [likes]);

  const isLiked = (token: unknown) => likes.includes(token);

  return (
    <div>
      {loaded ? (
        data ? (
          <div className={styles.Container}>
            <table className={styles.Table}>
              <thead className={styles.Table__head}>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>1h change</th>
                  <th>24h change</th>
                </tr>
              </thead>
              <tbody className={styles.Table__body}>
                {data.map((coin) => (
                  <tr
                    key={coin.id}
                    onClick={() =>
                      HandleExchangeClick(
                        coin.name,
                        coin.price_usd,
                        coin.symbol
                      )
                    }
                  >
                    <th>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          isLiked(coin.id)
                            ? removeToken(coin.id)
                            : addToken(coin.id);
                        }}
                        className={styles.Table__body__starbtn}
                      >
                        {isLiked(coin.id) ? (
                          <img
                            src="assets/icons/saved.svg"
                            width={30}
                            height={30}
                          />
                        ) : (
                          <img
                            src="assets/icons/notSaved.svg"
                            width={30}
                            height={30}
                          />
                        )}
                      </button>
                    </th>
                    <th>
                      <p className={styles.Table__body__name}>{coin.name}</p>
                      <p className={styles.Table__body__subname}>
                        {coin.symbol}
                      </p>
                    </th>
                    <th>$ {coin.price_usd}</th>
                    <th
                      className={
                        " " +
                        (CheckPositive(coin.percent_change_1h)
                          ? styles.Table__body__th__positive
                          : styles.Table__body__th__negative)
                      }
                    >
                      {coin.percent_change_1h} $
                    </th>
                    <th
                      className={
                        " " +
                        (CheckPositive(coin.percent_change_24h)
                          ? styles.Table__body__th__positive
                          : styles.Table__body__th__negative)
                      }
                    >
                      {coin.percent_change_24h} $
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <ExchangeModal
              active={showModal}
              setActive={setShowModal}
              price={selectedPrice}
              name={selectedName}
              symbol={selectedSymbol}
            />
          </div>
        ) : (
          <p className={styles.Empty}> Add coins first</p>
        )
      ) : (
        <div className={styles.LoadingContainer}>
          <div className={styles.Loading} />
        </div>
      )}
    </div>
  );
};
