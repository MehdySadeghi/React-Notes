import { useEffect, useState } from "react";

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>useEffect Cleanup Example</h1>

      <p>
        Open your browser's developer console, then toggle the timer to see when
        the effect starts and when the cleanup function runs.
      </p>

      <button onClick={() => setShowTimer((show) => !show)}>
        {showTimer ? "Hide Timer" : "Show Timer"}
      </button>

      <hr />

      {showTimer && <Timer />}
    </div>
  );
}

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(function () {
    console.log("✅ Timer Started");

    const id = setInterval(function () {
      setCount((count) => count + 1);
    }, 1000);

    return function () {
      console.log("🧹 Cleaning Up...");
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <h2>{count} seconds</h2>
      <p>The timer increases every second.</p>
    </div>
  );
}
