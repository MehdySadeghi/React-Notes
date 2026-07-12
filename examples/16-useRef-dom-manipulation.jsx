import { useRef } from "react";

export default function App() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Click the button..." />

      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
