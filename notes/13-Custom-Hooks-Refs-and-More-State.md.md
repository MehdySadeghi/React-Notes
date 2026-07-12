# React Hooks

- Built-in functions that allow us to "hook" into React internals. They expose React features such as:
  - Managing state
  - Creating and accessing side effects
  - Accessing refs (manual DOM references)
  - Creating reusable logic with custom hooks

- Hooks can be thought of as APIs that expose React functionality.

- Hooks always start with the **`use`** prefix.

---

# Rules of Hooks

## 1. Only call hooks at the top level.

Do **not** call hooks:

- Inside conditionals
- Inside loops
- Inside nested functions
- After an early `return`

Hooks must always be called in the **same order** because React relies on their call order.

As we know, during the render phase React creates a **Virtual DOM (React Element Tree)**. Based on that, React creates a **Fiber Tree**. Each Fiber contains information such as:

- Props
- State
- Effects
- A list of hooks

The list of hooks inside each Fiber is created based on the **order** in which hooks are called.

If, for example, a hook is placed inside a conditional and that condition becomes false, the order of hooks changes and React can no longer match each hook with its correct state.

---

## 2. Only call hooks from React functions.

Hooks should only be called:

- Inside a Function Component
- Inside a Custom Hook

---

# Review `useState`

- The initial value passed to `useState` is only used during the **initial render (mount)**.

  If that initial value depends on props or other state, changing those values later **does not** update the state automatically.

  In many situations, using **derived state** is a better solution than synchronizing state with `useEffect`.

---

- State updates are **asynchronous**, meaning we do **not** immediately get access to the updated state after calling the state setter.

  If the next state depends on the previous one, use the updater function:

```javascript
setCount((count) => count + 1);
```

---

- You can store data in **localStorage** using:

```javascript
localStorage.setItem("key", JSON.stringify(data));
```

This can happen inside an event handler or a `useEffect`.

Retrieve it with:

```javascript
const data = JSON.parse(localStorage.getItem("key"));
```

---

- You can lazily initialize state by passing a function to `useState`.

```javascript
const [value] = useState(() => expensiveCalculation());
```

The initializer function:

- Must be a pure function
- Takes no parameters
- Executes only once during the initial mount

This process is called **lazy initialization**.

---

- When you pass the **result of a function call** into `useState`, JavaScript executes that function on **every render**, even though React only uses its result during the initial render.

```javascript
useState(expensiveCalculation());
```

If you instead pass:

```javascript
useState(expensiveCalculation);
```

or

```javascript
useState(() => expensiveCalculation());
```

React calls the initializer **only once** during the initial mount, stores the returned value as the component's state, and reuses that state on future renders.

---

- You generally shouldn't manually select DOM elements using methods like:

```javascript
document.querySelector();
```

inside React components.

Instead, React provides **`useRef`**, which declaratively gives us access to DOM elements.

---

# `useRef`

`useRef` is like a box (object) with a mutable `.current` property that persists across renders (normal variables are recreated on every render).

## Two big use cases

### 1. Store mutable values without causing re-renders

Examples:

- Previous state/value
- `setTimeout` ID
- Interval ID
- External library instances

### 2. Selecting and storing DOM elements

---

- Refs are for data that is **NOT rendered**.

This means refs usually appear inside:

- Event handlers
- Effects

If a value should affect what the user sees, you most likely need **state**, not a ref.

---

# State VS Ref

| Feature                     | State | Ref |
| --------------------------- | :---: | :-: |
| Persists across renders     |  ✅   | ✅  |
| Updating causes a re-render |  ✅   | ❌  |
| Mutable                     |  ❌   | ✅  |
| Asynchronous updates        |  ✅   | ❌  |

State is used for data that should update the UI.

Refs are used for data that should be remembered between renders **without** updating the UI.

> **Rule of thumb:** If changing a value should update what the user sees, use **state**. If changing it should **not** update the UI but you still need to remember it between renders, use a **ref**.

---

# Using `useRef`

When referencing a DOM element, we usually initialize the ref with:

```javascript
const inputRef = useRef(null);
```

To reference a DOM element in React:

1. Create a ref using `useRef()`.
2. Pass that ref object to the element's `ref` prop.
3. After the component mounts, React assigns the corresponding DOM element to `ref.current`.

Example:

```javascript
const inputRef = useRef(null);

<input ref={inputRef} />;
```

Now we can access the DOM element:

```javascript
inputRef.current.focus();
```

---

# Custom Hooks

- If you need to reuse logic that contains hooks, create a **Custom Hook**.

- A Custom Hook should have **one responsibility** so it remains reusable and portable, even across multiple projects.

- The Rules of Hooks also apply to Custom Hooks.

- A Custom Hook's name **must** start with `use` so React's tooling and the Hooks ESLint plugin recognize it as a hook and can enforce the Rules of Hooks.

- A Custom Hook should call **one or more React Hooks**.

- Unlike components, Custom Hooks can receive and return any relevant data.

Common return types:

- Array `[]`
- Object `{}`

---

# Key Takeaways

- Hooks allow us to use React features inside function components.
- Hook order must always remain the same.
- State is for rendered data.
- Refs are for mutable values that don't affect rendering.
- Lazy initialization prevents expensive computations from running on every render.
- Custom Hooks help us reuse stateful logic without duplicating code.
