import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("created :)");
     //컴포넌트가 파괴될 때 리턴된 함수가 실행됨
    return () => console.log("destroyed :(");
  }, []);
  return <h1>Hello</h1>
}

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [hello, sethello] = useState(false);
  const onClick = () => setValue((prev) => prev + 1);
  const onHello = () => sethello((prev) => !prev);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    console.log("한번만 실행");
  }, []);
  useEffect(() => {
    console.log("keyword가 바뀔 때 실행");
  },[keyword]);
  useEffect(() => {
    console.log("counter가 바뀔 때 실행");
  },[counter]);
  useEffect(() => {
    console.log("둘 중 하나가 바뀔 때 실행");
  },[keyword, counter]);
  
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
      <button onClick={onHello}>hi?</button>
      {hello ? <Hello/> : null}
    </div>
  );
}

export default App;
