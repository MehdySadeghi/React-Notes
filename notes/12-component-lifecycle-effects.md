# React Component Lifecycle (Component Instance)

A **component instance** goes through three main phases during its lifetime.

---

## 1. Mount (Initial Render)

The component is created and rendered for the **first time**.

- Fresh state is created.
- Props are received.
- React renders the JSX.
- Effects (`useEffect`) run **after** the component is painted (depending on the dependency array).

---

## 2. Re-render (Optional)

A component re-renders whenever one of these happens:

- State changes
- Props change
- Parent component re-renders
- Context value changes

> During a re-render, the component function executes again, but the component instance remains the same.

---

## 3. Unmount

The component is removed from the UI.

- State is destroyed.
- Effects are cleaned up.
- Cleanup functions execute.

---

# Fetching Data in React

Fetching data is considered a **side effect**.

You **should not** perform side effects directly inside the component body because React components should remain **pure**.

### ❌ Incorrect

```jsx
function App() {
  fetch(...);

  return (...);
}
```

Since the component function executes on every render, this would trigger a new fetch request every time the component renders. If the fetched data updates the component's state, it can cause an infinite render loop.

Instead, perform data fetching inside **useEffect**.

### ✅ Correct

```jsx
useEffect(() => {
  fetch(...);
}, []);
```

---

# What is a Side Effect?

A **side effect** is any interaction between a React component and the outside world.

Examples include:

- Fetching data from an API
- Setting up subscriptions
- Setting timers (`setTimeout`, `setInterval`)
- Manually accessing the DOM
- Using Local Storage
- Browser APIs

---

# Two Ways to Perform Side Effects

## 1. Event Handlers (Preferred)

Triggered by user interactions.

Examples:

- `onClick`
- `onSubmit`
- `onChange`

React recommends performing side effects inside event handlers whenever possible because they only execute in response to user actions.

---

## 2. Effects (`useEffect`)

Effects are used when side effects need to happen because the component was rendered.

Effects can run after:

- Mount
- Re-render
- Unmount (cleanup)

---

# useEffect()

Syntax:

```jsx
useEffect(() => {
  // Side effect

  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

`useEffect` accepts **two arguments**:

1. A function that contains the side effect.
2. A dependency array.

---

# Dependency Array

There are three ways to use the dependency array.

## 1. No dependency array

```jsx
useEffect(() => {});
```

Runs **after every render**.

---

## 2. Empty dependency array

```jsx
useEffect(() => {}, []);
```

Runs **only once after the initial mount**.

---

## 3. Dependencies provided

```jsx
useEffect(() => {}, [query, id]);
```

Runs:

- After the initial mount
- Whenever any dependency changes

---

# When Does an Effect Re-run?

An effect executes again whenever one of its dependencies changes.

React compares the previous dependency values with the new ones.

If any dependency has changed:

1. React runs the cleanup function (if one exists).
2. React executes the effect again.

---

# Render Phase vs Effect Phase

## Render Phase

During the render phase:

- The component function executes.
- JSX is returned.
- Rendering should stay pure.
- No side effects should happen here.

---

## Effect Phase

The effect phase happens **after React updates the DOM and the browser paints the screen.**

This is where side effects belong.

---

# Cleanup Function

A cleanup function is an optional function returned from an effect.

```jsx
useEffect(() => {
  // Effect

  return () => {
    // Cleanup
  };
}, []);
```

The cleanup function runs in two situations:

1. Before the effect executes again.
2. When the component unmounts.

---

# When is Cleanup Necessary?

Cleanup is necessary whenever a side effect continues running after rendering.

Examples:

- Timers
- Event listeners
- Subscriptions
- Fetch requests
- WebSockets

---

# One Effect = One Responsibility

A good React practice is:

> **Each effect should have only one responsibility.**

Instead of:

```jsx
useEffect(() => {
  fetchData();
  document.title = "...";
  window.addEventListener(...);
}, []);
```

Prefer:

```jsx
useEffect(fetchData, []);

useEffect(updateTitle, []);

useEffect(addListener, []);
```

This makes your code easier to understand, debug, and maintain.

---

# Cleaning Up Fetch Requests

Suppose the user searches very quickly:

```text
React
React Hooks
React Router
```

Without cleanup:

- Request 1 is still running.
- Request 2 starts.
- Request 3 starts.

If Request 1 finishes after Request 3, it could overwrite your newest data with old data.

To prevent this, use **AbortController**.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, {
    signal: controller.signal,
  });

  return () => {
    controller.abort();
  };
}, [url]);
```

Whenever the dependency changes:

1. React runs the cleanup.
2. The previous request is aborted.
3. A new request starts.

This prevents outdated requests from updating your state.

---

# Important Things to Remember

- Components should be **pure**.
- Side effects belong in **event handlers** or **useEffect**.
- Event handlers are the preferred place for side effects whenever possible.
- Effects run **after rendering**.
- Cleanup runs **before the next effect** and **when the component unmounts**.
- Every effect should have **one responsibility**.
- Use **AbortController** to cancel unnecessary fetch requests.
