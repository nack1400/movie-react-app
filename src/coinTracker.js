import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [select, setSelect] = useState("");
  const onChange = (event) => {
    setMoney(event.target.value);
    console.log(money);
  };
  const onSelect = (event) => {
    setSelect(event.target.value);
    console.log(select);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading....</strong>
      ) : (
        <div>
          <input value={money} onChange={onChange} placeholder="투자할 달러 입력($ USD)" />
          <select value={select} onChange={onSelect}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}: ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          구매 가능한 코인의 수 : {Math.floor(money/select)}
        </div>
      )}
    </div>
  );
}

export default App;
