import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [select, setSelect] = useState(0);

  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const onSelect = (event) => {
    setSelect(event.target.value);
    setSearch(false);
  };
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
          <input value={money} onChange={onChange} placeholder="투자할 달러 입력($ USD)" disabled={search}/>
          <hr/>
          <select value={select} onChange={onSelect}>
            {coins.map((coin, index) => (
              <option value={coin.quotes.USD.price} key={index}>
                {coin.name} ({coin.symbol}: ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <br/><br/>
          구매 가능한 코인의 수 : {Math.floor(money/select)}
        </div>
      )}
    </div>
  );
}

export default App;
