# React Behind the Scenes

To write efficient React applications, it's important to understand **what React actually does behind the scenes**.

Although we write JSX and components, React performs many internal operations to efficiently update the user interface.

Some of the most important concepts are:

- Rendering
- Re-rendering
- Virtual DOM
- Reconciliation
- Diffing Algorithm
- Component Instances
- React Elements
- Render Cycle

Understanding these concepts helps explain **why React is fast**.

---

# How React Works

The process looks like this:

```text
State / Props Change
          │
          ▼
Component Re-renders
          │
          ▼
New Virtual DOM Created
          │
          ▼
Diffing Algorithm
          │
          ▼
Reconciliation
          │
          ▼
Only Necessary DOM Updates
```

React does **not** recreate the whole page every time something changes.

Instead, it updates only what actually changed.

---

# Rendering

Rendering means React calls your component functions to determine what the UI should look like.

Example:

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

React executes the function.

The returned JSX becomes a **React Element**.

Rendering does **not** immediately update the browser.

---

# Initial Render

When the application starts:

1. React renders the root component.
2. Child components render.
3. React builds the Virtual DOM.
4. The real DOM is created.
5. The browser paints the screen.

```text
App

↓

React Elements

↓

Virtual DOM

↓

Real DOM

↓

Screen
```

---

# Re-rendering

A re-render happens whenever React needs to calculate a new UI.

Common causes:

- State changes
- Parent component re-renders
- Props change
- Context changes

Example:

```jsx
setCount(count + 1);
```

React renders the component again.

This **does not** mean the entire DOM is recreated.

---

# What Triggers a Re-render?

React re-renders when:

✅ State updates

```jsx
setCount(1);
```

---

✅ Parent renders

```text
Parent

↓

Child
```

Children also render unless React skips them (for example, with memoization).

---

✅ Props change

```jsx
<User name="John" />
```

Later:

```jsx
<User name="Jane" />
```

---

✅ Context value changes

Any component consuming that context re-renders.

---

# What Does NOT Trigger a Re-render?

Changing ordinary variables.

```jsx
let count = 0;

count++;
```

React doesn't know the variable changed.

Only updating **state** (or receiving new props/context) tells React to re-render.

---

# React Elements

When JSX is compiled,

```jsx
<h1>Hello</h1>
```

becomes

```javascript
React.createElement(...)
```

A React Element is a plain JavaScript object describing the UI.

Example (simplified):

```javascript
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```

React Elements are **descriptions**, not actual DOM nodes.

---

# Virtual DOM

The Virtual DOM is an in-memory representation of the UI.

It is a lightweight JavaScript object tree.

Example:

```text
App
│
├── Header
├── Main
└── Footer
```

Every render creates a new Virtual DOM tree.

React compares it with the previous one.

---

# Why Not Update the Real DOM Directly?

Updating the real DOM is relatively expensive.

React first performs calculations in memory using the Virtual DOM because JavaScript objects are much faster to create and compare than DOM nodes.

Only after finding the differences does React touch the real DOM.

---

# Diffing Algorithm

React compares:

```text
Previous Virtual DOM

↓

New Virtual DOM
```

This comparison is called **Diffing**.

The goal is to determine exactly what changed.

Example:

Before:

```html
<h1>Hello</h1>
```

After:

```html
<h1>Hello React</h1>
```

React detects that only the text changed.

It does **not** recreate the entire `<h1>` element.

---

# Reconciliation

Reconciliation is the process React uses to update the UI efficiently after diffing.

Flow:

```text
Old Virtual DOM

↓

New Virtual DOM

↓

Find Differences

↓

Update Real DOM
```

Only the necessary DOM operations are performed.

---

# Component Instances

Every rendered component has its own instance.

Example:

```jsx
<Card />
<Card />
<Card />
```

Although they come from the same component function,

React creates three independent component instances.

Each instance has its own:

- State
- Props
- Lifecycle

---

# Component Tree

React organizes the UI as a tree.

```text
App
│
├── Navbar
├── Hero
├── Products
│   ├── Product
│   ├── Product
│   └── Product
└── Footer
```

When a component re-renders,

React traverses this tree to determine which parts need updating.

---

# Render Phase vs Commit Phase

React performs updates in two phases.

## 1. Render Phase

React:

- Calls component functions.
- Creates React Elements.
- Builds the new Virtual DOM.
- Calculates differences.

No changes are made to the browser yet.

---

## 2. Commit Phase

React applies the calculated changes to the real DOM.

The browser then repaints the updated UI.

---

# Re-render Does NOT Mean DOM Update

A common misconception is:

> "If a component re-renders, the DOM is recreated."

This is false.

React may render the component but discover that nothing actually changed.

Example:

```jsx
function Header() {
  return <h1>React</h1>;
}
```

Even if `Header` renders again,

React may decide that no DOM updates are needed.

Rendering and DOM updates are different processes.

---

# Keys and Reconciliation

Keys help React identify list items.

Example:

```jsx
items.map(item => (
  <Item
    key={item.id}
    item={item}
  />
))
```

Without stable keys,

React may recreate or reorder components incorrectly.

Keys improve reconciliation performance and preserve component state.

---

# Why React is Fast

React is fast because it:

- Uses the Virtual DOM.
- Compares Virtual DOM trees efficiently.
- Updates only the changed DOM nodes.
- Minimizes expensive browser operations.

The browser performs far less work compared to manually updating the DOM.

---

# Rendering is Cheap

Calling component functions is relatively inexpensive.

Updating the real DOM is much more expensive.

React prefers:

- More JavaScript work.
- Fewer DOM operations.

This trade-off generally leads to better performance.

---

# Best Practices

✅ Keep components pure.

✅ Avoid unnecessary state.

✅ Use stable keys in lists.

✅ Don't mutate state directly.

✅ Understand that re-rendering is normal.

✅ Optimize only when performance actually becomes a problem.

---

# Common Mistakes

❌ Thinking re-rendering always updates the DOM.

❌ Confusing the Virtual DOM with the real DOM.

❌ Believing React recreates the entire page after every state change.

❌ Using unstable keys such as `Math.random()`.

❌ Mutating state directly, preventing React from detecting changes correctly.

---

# Interview Notes

### What is the Virtual DOM?

A lightweight JavaScript representation of the UI that React uses to calculate updates before touching the real DOM.

---

### What is Reconciliation?

The process of comparing the previous Virtual DOM with the new Virtual DOM and updating only the necessary parts of the real DOM.

---

### What is Diffing?

The algorithm React uses to compare two Virtual DOM trees and determine what has changed.

---

### What triggers a re-render?

- State updates
- New props
- Parent re-renders
- Context changes

---

### Does re-rendering always update the DOM?

No.

A component may re-render, but if the rendered output hasn't changed, React performs little or no DOM updates.

---

### Why are keys important?

Keys allow React to correctly identify list items during reconciliation, improving performance and preserving component state.

---

### What are the Render and Commit phases?

**Render Phase**

- React executes components.
- Creates React Elements.
- Builds the new Virtual DOM.
- Calculates changes.

**Commit Phase**

- React applies the required updates to the real DOM.
- The browser repaints the UI.

---

# Key Takeaways

- React components render to produce React Elements.
- React builds a Virtual DOM from those elements.
- State, props, parent renders, and context changes can trigger re-renders.
- Re-rendering does **not** necessarily mean updating the real DOM.
- React compares the old and new Virtual DOM using the Diffing Algorithm.
- Reconciliation applies only the necessary updates to the real DOM.
- The Render Phase calculates changes, while the Commit Phase applies them.
- Stable keys improve reconciliation and help preserve component state.
- React is fast because it minimizes expensive DOM operations while keeping rendering predictable and efficient.