# Event Handling

Event handling is the process of responding to user interactions such as:

- Clicking a button
- Typing into an input
- Submitting a form
- Hovering over an element
- Pressing a keyboard key
- Scrolling the page

React uses **event handlers** to respond to these interactions and update the UI.

---

# Why Do We Need Event Handling?

Without event handling, a React application would only display static content.

Users wouldn't be able to:

- Click buttons
- Fill out forms
- Search
- Delete items
- Add products to a cart
- Navigate the application

Event handling makes applications **interactive**.

---

# Event Handlers

An event handler is simply a **function** that executes when an event occurs.

Example:

```jsx
function App() {
  function handleClick() {
    alert("Button clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```

When the button is clicked, `handleClick()` is executed.

---

# React Event Naming

React events use **camelCase** instead of lowercase HTML attributes.

| HTML | React |
|------|-------|
| onclick | onClick |
| onchange | onChange |
| onsubmit | onSubmit |
| onmouseover | onMouseOver |
| onkeydown | onKeyDown |

Example:

```jsx
<button onClick={handleClick}>
  Click
</button>
```

---

# Passing an Event Handler

Always pass the function itself.

✅ Correct

```jsx
<button onClick={handleClick}>
  Click
</button>
```

❌ Incorrect

```jsx
<button onClick={handleClick()}>
  Click
</button>
```

Calling the function executes it **immediately** during rendering instead of waiting for the click.

---

# Inline Event Handlers

You can also use an arrow function.

```jsx
<button
  onClick={() => {
    console.log("Clicked");
  }}
>
  Click
</button>
```

Useful for short logic or passing arguments.

---

# Passing Arguments

Suppose we have:

```jsx
function deleteItem(id) {
  console.log(id);
}
```

Incorrect:

```jsx
<button onClick={deleteItem(5)}>
  Delete
</button>
```

Correct:

```jsx
<button onClick={() => deleteItem(5)}>
  Delete
</button>
```

The arrow function delays execution until the click occurs.

---

# Event Object

React automatically passes an event object to event handlers.

Example:

```jsx
function handleClick(event) {
  console.log(event);
}

<button onClick={handleClick}>
  Click
</button>
```

This object contains information about the event.

Examples:

- Which element triggered it
- Mouse position
- Keyboard key pressed
- Input value

---

# Synthetic Events

React wraps browser events inside **Synthetic Events**.

A Synthetic Event:

- Works the same across all browsers.
- Has the same interface as native browser events.
- Improves cross-browser compatibility.

Usually, you don't need to think about the difference.

---

# Common React Events

## Mouse Events

```jsx
onClick
```

```jsx
onDoubleClick
```

```jsx
onMouseEnter
```

```jsx
onMouseLeave
```

```jsx
onMouseMove
```

---

## Form Events

```jsx
onChange
```

```jsx
onSubmit
```

```jsx
onInput
```

```jsx
onFocus
```

```jsx
onBlur
```

---

## Keyboard Events

```jsx
onKeyDown
```

```jsx
onKeyUp
```

---

# onChange

Used for controlled form inputs.

Example:

```jsx
function App() {
  const [text, setText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <input
      value={text}
      onChange={handleChange}
    />
  );
}
```

Every time the user types, the state updates.

---

# onSubmit

Used when submitting forms.

Example:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  console.log("Submitted");
}

<form onSubmit={handleSubmit}>
  <button>Submit</button>
</form>
```

---

# preventDefault()

Some browser events have default behavior.

Examples:

- Forms reload the page.
- Links navigate to another page.

To prevent that behavior:

```jsx
event.preventDefault();
```

Example:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  // Process form
}
```

---

# stopPropagation()

Sometimes an event bubbles to parent elements.

Example:

```jsx
<div onClick={() => console.log("Parent")}>
  <button
    onClick={(event) => {
      event.stopPropagation();
      console.log("Button");
    }}
  >
    Click
  </button>
</div>
```

Clicking the button prints:

```text
Button
```

instead of

```text
Button
Parent
```

---

# Event Bubbling

Events travel upward through the DOM.

Example:

```text
Button
   │
   ▼
Card
   │
   ▼
Container
```

Clicking the button also triggers click handlers on its parent elements unless propagation is stopped.

---

# Updating State Inside Events

Most event handlers update state.

Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <button onClick={increase}>
      {count}
    </button>
  );
}
```

This is one of the most common patterns in React.

---

# Event Handlers vs useEffect

Event handlers and Effects can both perform side effects, but they are triggered differently.

**Event Handlers**

- Triggered by user interactions.
- Preferred whenever possible.
- Examples:
  - Clicking a button
  - Typing
  - Submitting a form

**useEffect**

- Triggered by rendering.
- Runs after mount or re-render.
- Used when logic should happen because the component rendered, not because the user performed an action.

---

# Best Practices

✅ Use named functions for complex logic.

✅ Use arrow functions only when necessary.

✅ Keep event handlers short and readable.

✅ Use `preventDefault()` for forms.

✅ Update state using setter functions.

✅ Perform side effects in event handlers whenever possible.

---

# Common Mistakes

❌ Calling an event handler instead of passing it.

```jsx
onClick={handleClick()}
```

Correct:

```jsx
onClick={handleClick}
```

---

❌ Writing large amounts of logic inline.

---

❌ Forgetting `preventDefault()` on forms.

---

❌ Mutating state inside event handlers.

---

❌ Using `onclick` instead of `onClick`.

---

# Interview Notes

### What is an event handler?

A function that executes in response to a user interaction such as clicking, typing, or submitting a form.

---

### Why do we pass `handleClick` instead of `handleClick()`?

Passing `handleClick` gives React a reference to the function.

Calling `handleClick()` executes it immediately during rendering.

---

### What is a Synthetic Event?

A browser-independent wrapper around native browser events provided by React.

It provides a consistent interface across different browsers.

---

### What does `preventDefault()` do?

It prevents the browser's default behavior.

Example:

Preventing a form from refreshing the page when submitted.

---

### What does `stopPropagation()` do?

It prevents an event from bubbling to parent elements.

---

### When should side effects happen?

Prefer event handlers whenever the side effect is triggered by a user action.

Use `useEffect` when the side effect should happen because the component rendered.

---

# Key Takeaways

- Event handling makes React applications interactive.
- Event handlers are functions that respond to user interactions.
- React uses camelCase event names.
- Pass event handlers, don't call them.
- Arrow functions are useful for passing arguments.
- React automatically provides a Synthetic Event object.
- Use `preventDefault()` to stop default browser behavior.
- Use `stopPropagation()` to stop event bubbling.
- Most event handlers update state.
- Prefer performing side effects inside event handlers instead of `useEffect` whenever possible.