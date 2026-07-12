import { useState } from "react";

function expensiveCalculation() {
  console.log("Running expensive calculation...");

  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i;
  }

  return sum;
}

export default function App() {
  const [value, setValue] = useState(expensiveCalculation);

  return (
    <div>
      <h1>{value}</h1>

      <button onClick={() => setValue((value) => value + 1)}>Increase</button>
    </div>
  );
}
