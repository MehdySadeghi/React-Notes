import { useState } from "react";

function Counter({ count, setCount }) {
  return <button onClick={() => setCount(count + 1)}>Increase</button>;
}

function Display({ count }) {
  return <h2>{count}</h2>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter count={count} setCount={setCount} />

      <Display count={count} />
    </>
  );
}
