# Thinking in React: State Management

One of the most important React skills is **knowing where state should live**.

As applications grow, deciding **which component should own the state** becomes more important than simply knowing how to use `useState()`.

The React team recommends following a simple mental model:

> **Keep state as local as possible, but as global as necessary.**

---

# What is State Management?

State management is the process of deciding:

- What should be state?
- Which component should own it?
- Which components need access to it?
- How should it be updated?

Good state management makes applications easier to:

- Maintain
- Debug
- Scale
- Understand

---

# Step 1: Build the Static UI First

Before adding state, build the UI using only props.

Example:

```text
App
│
├── Header
├── Search
├── ProductList
└── Footer
```

At this stage:

- No `useState`
- No event handlers
- No interactivity

Only build the visual structure.

---

# Step 2: Identify What Changes

Ask yourself:

> **What data changes over time?**

Examples:

- Search text
- Selected category
- Cart items
- Theme
- Logged-in user
- Loading status

These are good candidates for state.

---

# Step 3: Identify What Doesn't Change

Not everything belongs in state.

Example:

```jsx
const companyName = "React Store";
```

No state is needed because this value never changes.

Another example:

```jsx
const tax = 0.09;
```

Constants should remain regular variables.

---

# Step 4: Find the Owner

Ask:

> **Which component needs this state?**

Three common cases:

---

## Only One Component Needs It

Keep the state inside that component.

```text
App
│
└── Search
```

```jsx
function Search() {
  const [query, setQuery] =
    useState("");
}
```

No lifting is necessary.

---

## Multiple Components Need It

Lift the state to the closest common parent.

Before:

```text
App
│
├── Search
└── ProductList
```

After:

```text
App (query state)
│
├── Search
└── ProductList
```

Now both components share the same state.

---

## Many Deeply Nested Components Need It

Example:

```text
App
│
└── Dashboard
      │
      └── Sidebar
            │
            └── Menu
```

Passing props through every level becomes difficult.

This is where **Context API** becomes useful.

---

# The Single Source of Truth

Every piece of state should exist in **only one place**.

Bad:

```text
Search State

ProductList State
```

Good:

```text
App State
```

Multiple copies of the same data eventually become inconsistent.

---

# Avoid Duplicate State

Bad:

```jsx
const [items, setItems] =
  useState([]);

const [itemCount, setItemCount] =
  useState(0);
```

`itemCount` can be calculated.

Instead:

```jsx
const itemCount =
  items.length;
```

Whenever possible,

**derive values instead of storing them.**

---

# Derived State

Derived state is calculated from existing state.

Instead of storing:

```jsx
const [fullName, setFullName] =
  useState("");
```

Store:

```jsx
const [firstName, setFirstName] =
  useState("");

const [lastName, setLastName] =
  useState("");
```

Then calculate:

```jsx
const fullName =
  `${firstName} ${lastName}`;
```

Avoid storing information that can be derived.

---

# Minimal State

A good React application stores the **minimum amount of state possible**.

Example:

Bad:

```jsx
const [price, setPrice] =
  useState(100);

const [quantity, setQuantity] =
  useState(2);

const [total, setTotal] =
  useState(200);
```

Better:

```jsx
const total =
  price * quantity;
```

The fewer state variables you have, the fewer bugs you'll create.

---

# State vs Props

State belongs to one component.

Props are how state is shared.

Flow:

```text
State

↓

Props

↓

Child Components
```

The parent owns the state.

Children receive data through props.

---

# Local State

Local state belongs to one component.

Example:

```jsx
function Modal() {
  const [open, setOpen] =
    useState(false);
}
```

Only the `Modal` cares about whether it is open.

---

# Shared State

Example:

```text
App
│
├── Search
└── ProductList
```

Both components need access to the search query.

The parent should own it.

---

# Global State

Some data is needed almost everywhere.

Examples:

- Current user
- Theme
- Language
- Authentication
- Shopping cart (sometimes)

Global state is commonly managed using:

- Context API
- Redux
- Zustand
- Jotai

Most applications do **not** need global state for everything.

---

# State Should Stay Close

A common beginner mistake is putting all state inside `App`.

Example:

```text
App

- Theme

- Search

- Modal

- Cart

- Counter

- Form

- Filters
```

This creates unnecessary re-renders.

Instead,

keep state close to where it's used.

---

# State Update Flow

```text
User Action

↓

Event Handler

↓

setState()

↓

Component Re-renders

↓

Children Receive New Props

↓

UI Updates
```

This predictable flow is one of React's biggest strengths.

---

# Controlled Components

Forms are typically controlled.

```jsx
const [name, setName] =
  useState("");
```

React becomes the source of truth.

---

# Lifting State Up

If multiple components need the same state,

move it upward.

Example:

```text
App
│
├── Counter
└── Display
```

The parent owns the state.

Both children receive it through props.

---

# Don't Sync State

Bad:

```jsx
const [count, setCount] =
  useState(0);

const [doubleCount, setDoubleCount] =
  useState(0);
```

Every update requires updating both values.

Better:

```jsx
const doubleCount =
  count * 2;
```

React developers try to avoid "state synchronization."

---

# Thinking Like React

When adding a feature, ask yourself:

1. Does this value change?
2. Does it affect rendering?
3. Can it be derived?
4. Which component needs it?
5. Which component should own it?
6. Do multiple components need it?
7. Should it be local, shared, or global?

Answering these questions usually leads to the correct architecture.

---

# Best Practices

✅ Keep state as local as possible.

✅ Lift state only when necessary.

✅ Store the minimum amount of state.

✅ Derive values instead of storing them.

✅ Keep a single source of truth.

✅ Avoid duplicate state.

✅ Let parents own shared state.

---

# Common Mistakes

❌ Storing derived values in state.

❌ Duplicating state.

❌ Lifting state higher than necessary.

❌ Putting every state variable inside `App`.

❌ Creating global state too early.

❌ Forgetting that props are read-only.

---

# Interview Notes

### What is state management?

State management is deciding where state should live, who owns it, and how it should be shared throughout the application.

---

### What is the Single Source of Truth?

Each piece of state should exist in only one place.

Other values should be derived from it whenever possible.

---

### What is derived state?

A value calculated from existing state instead of being stored separately.

Example:

```jsx
const total = price * quantity;
```

---

### Why should state be kept local?

Local state reduces unnecessary re-renders, keeps components independent, and makes applications easier to understand and maintain.

---

### When should state be lifted?

When two or more components need access to the same data.

Lift it to their closest common parent.

---

### When should Context API be used?

When many deeply nested components need access to the same state and prop drilling becomes difficult.

---

# Key Takeaways

- State management is about deciding where state should live.
- Build the static UI before introducing state.
- Store only data that changes and affects rendering.
- Keep state as local as possible.
- Lift state only when multiple components need it.
- Maintain a single source of truth for each piece of state.
- Prefer derived values over duplicated state.
- Parents own state, children receive it through props.
- Context API and state management libraries are useful only when shared state becomes difficult to manage with props alone.
- Good state management leads to simpler, more scalable React applications.