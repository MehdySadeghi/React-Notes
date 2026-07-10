import { useState } from "react";

function Child() {
  console.log("Child Render");

  return <h2>Child Component</h2>;
}

export default function App() {
  const [count, setCount] = useState(0);

  console.log("App Render");

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Increase</button>

      <Child />
    </>
  );
}
