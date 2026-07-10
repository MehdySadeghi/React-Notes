# State

State is data that belongs to a component and can **change over time**.

Whenever a component's state changes, React automatically re-renders the component to update the UI.

State allows React applications to be **dynamic and interactive**.

---

# Why Do We Need State?

Imagine building a counter without state.

```jsx
function Counter() {
  let count = 0;

  function increase() {
    count++;
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
    </>
  );
}
```

Clicking the button changes the variable, but the UI **doesn't update** because React doesn't know the value changed.

Instead, use state.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
    </>
  );
}
```

Now React knows the state changed and automatically updates the UI.

---

# What is useState?

`useState` is a **React Hook** that allows functional components to have state.

Syntax:

```jsx
const [state, setState] = useState(initialValue);
```

Example:

```jsx
const [count, setCount] = useState(0);
```

- `count` → current state value.
- `setCount` → function used to update the state.
- `0` → initial state value.

---

# The useState Hook

`useState()` returns an array containing two values.

```jsx
const [state, setState] = useState(initialValue);
```

Equivalent to:

```jsx
const stateArray = useState(0);

const state = stateArray[0];
const setState = stateArray[1];
```

React developers almost always use **array destructuring**.

---

# Initial State

The initial value is used **only during the first render**.

```jsx
const [count, setCount] = useState(0);
```

After that, React ignores the initial value and keeps track of the current state internally.

---

# Updating State

State should **never** be changed directly.

❌ Incorrect

```jsx
count = count + 1;
```

or

```jsx
count++;
```

Instead, use the setter function.

✅ Correct

```jsx
setCount(count + 1);
```

---

# What Happens When State Updates?

Calling the setter function tells React:

1. Store the new state.
2. Re-render the component.
3. Update the UI.

Flow:

```text
User Action
      │
      ▼
setState()
      │
      ▼
React updates state
      │
      ▼
Component re-renders
      │
      ▼
UI updates
```

---

# State is Immutable

Never modify state directly.

Objects

❌

```jsx
user.name = "John";
```

Arrays

❌

```jsx
items.push(newItem);
```

Instead, create a new object or array.

Objects

```jsx
setUser({
  ...user,
  name: "John",
});
```

Arrays

```jsx
setItems([...items, newItem]);
```

React relies on creating new values to detect state changes.

---

# Updating State Based on Previous State

Sometimes the new state depends on the previous state.

Instead of:

```jsx
setCount(count + 1);
```

Use the functional updater.

```jsx
setCount(previous => previous + 1);
```

This guarantees that you're working with the latest state value.

Example:

```jsx
function increase() {
  setCount(previous => previous + 1);
}
```

---

# Multiple State Variables

A component can have multiple pieces of state.

```jsx
const [name, setName] = useState("");

const [age, setAge] = useState(22);

const [isLoggedIn, setIsLoggedIn] = useState(false);
```

Each state variable is independent.

---

# State Can Store Any JavaScript Value

## String

```jsx
const [name, setName] = useState("");
```

---

## Number

```jsx
const [count, setCount] = useState(0);
```

---

## Boolean

```jsx
const [isOpen, setIsOpen] = useState(false);
```

---

## Array

```jsx
const [items, setItems] = useState([]);
```

---

## Object

```jsx
const [user, setUser] = useState({
  name: "",
  age: 0,
});
```

---

# State is Local

State belongs only to the component where it is created.

```text
App
│
├── Counter
│
└── Counter
```

Each `Counter` has its own independent state.

Changing one counter does **not** affect the other.

---

# Props vs State

| Props | State |
|--------|-------|
| Passed from parent | Owned by the component |
| Read-only | Can be updated |
| External data | Internal data |
| Cannot be changed by child | Updated with setter function |

---

# When Should You Use State?

Use state whenever data:

- Changes over time.
- Affects what is displayed.
- Needs to trigger a re-render.

Examples:

- Counter value
- Form inputs
- Modal visibility
- Theme selection
- Shopping cart
- Logged-in user
- Loading indicators

---

# When Shouldn't You Use State?

Do **not** use state for values that never change.

Instead of:

```jsx
const [title] = useState("React");
```

Simply write:

```jsx
const title = "React";
```

Not everything needs to be state.

---

# Lazy Initial State

If computing the initial state is expensive, pass a function.

Instead of:

```jsx
const [items, setItems] = useState(createItems());
```

Use:

```jsx
const [items, setItems] = useState(() => createItems());
```

React calls this function **only once** during the initial render.

---

# State Updates are Asynchronous

React doesn't update state immediately.

```jsx
setCount(count + 1);

console.log(count);
```

The console still prints the **old value** because React schedules the update.

The new value becomes available after the component re-renders.

---

# Best Practices

✅ Keep state as small as possible.

✅ Use one state variable for one piece of data.

✅ Never mutate state directly.

✅ Use the functional updater when the next state depends on the previous state.

✅ Store only data that affects rendering.

---

# Common Mistakes

❌ Modifying state directly.

❌ Storing values that never change in state.

❌ Forgetting that state updates are asynchronous.

❌ Mutating arrays with `push()`.

❌ Mutating objects directly.

❌ Creating unnecessary state variables.

---

# Interview Notes

### What is state?

State is data owned by a component that can change over time. When state changes, React re-renders the component.

---

### What does `useState()` return?

An array containing:

1. The current state.
2. A setter function used to update that state.

---

### Why shouldn't state be modified directly?

React detects state changes through the setter function. Direct mutations don't notify React and may prevent the UI from updating correctly.

---

### What happens when state changes?

1. React stores the new state.
2. The component re-renders.
3. The UI updates to reflect the new state.

---

### Can state store objects and arrays?

Yes.

State can store any JavaScript value, including:

- Strings
- Numbers
- Booleans
- Arrays
- Objects
- Functions

---

### When should you use the functional updater?

Whenever the next state depends on the previous state.

Example:

```jsx
setCount(previous => previous + 1);
```

---

### What is the difference between props and state?

**Props**

- Passed from parent to child.
- Read-only.
- Configure a component.

**State**

- Owned by the component.
- Can change over time.
- Causes re-renders.

---

# Key Takeaways

- State represents data that can change over time.
- React components use the `useState` Hook to manage state.
- Updating state causes React to re-render the component.
- Never modify state directly.
- Always use the setter function returned by `useState`.
- State is local to the component that owns it.
- State can store any JavaScript value.
- Use the functional updater when the next state depends on the previous state.
- Keep state minimal and avoid storing unnecessary data.
- React state updates are asynchronous and become visible after the next render.