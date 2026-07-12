import { useState } from "react";
import { useDocumentTitle } from "./useDocumentTitle";

export default function App() {
  const [count, setCount] = useState(0);

  useDocumentTitle(`Count: ${count}`);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount((count) => count + 1)}>+</button>

      <button onClick={() => setCount((count) => count - 1)}>-</button>
    </div>
  );
}
