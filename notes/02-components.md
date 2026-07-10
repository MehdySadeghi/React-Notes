# React Components

Components are the building blocks of every React application.

A component is a **reusable, independent piece of UI** that contains its own structure, logic, and behavior.

Instead of building an entire page as one large file, React applications are built by combining many small components.

---

# Why Do We Need Components?

Imagine building a website without components.

If the navigation bar appears on 10 pages, you would have to copy and paste the same code 10 times.

If you later wanted to change one link, you'd have to edit all 10 copies.

Components solve this problem by allowing us to write code once and reuse it wherever we need.

Benefits of components:

- Reusability
- Better organization
- Easier maintenance
- Improved readability
- Better scalability

---

# What is a Component?

A React component is simply a **JavaScript function** that returns JSX.

Example:

```jsx
function Header() {
  return <h1>Welcome to React</h1>;
}
```

Using the component:

```jsx
function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

---

# Component Naming Rules

React components must:

- Start with an uppercase letter.
- Return JSX.
- Be reusable.

✅ Correct

```jsx
function Header() {
  return <h1>Header</h1>;
}
```

❌ Incorrect

```jsx
function header() {
  return <h1>Header</h1>;
}
```

Lowercase names are interpreted as HTML elements.

---

# Root Component

Every React application has one root component.

Usually, it is called:

```jsx
App
```

Example:

```jsx
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

React starts rendering from this component.

---

# Component Composition

Large applications are built by combining many smaller components.

Example:

```text
App
│
├── Header
│
├── Main
│   ├── Sidebar
│   ├── ProductList
│   │   ├── Product
│   │   ├── Product
│   │   └── Product
│   └── Cart
│
└── Footer
```

This is called **Component Composition**.

Each component has one responsibility.

---

# Rendering Components

To render a component, use JSX syntax.

```jsx
<Header />
```

or

```jsx
<Header></Header>
```

Both are equivalent.

---

# Components Can Be Reused

One component can be rendered multiple times.

```jsx
function Card() {
  return <div>Product Card</div>;
}

function App() {
  return (
    <>
      <Card />
      <Card />
      <Card />
    </>
  );
}
```

React creates a separate component instance for each `<Card />`.

---

# Components Can Contain Other Components

Components can be nested.

```jsx
function Navbar() {
  return (
    <nav>
      <Logo />
      <Menu />
    </nav>
  );
}
```

This creates a hierarchy of components.

---

# Pure Components

React components should behave like **pure functions**.

A pure component:

- Produces the same output for the same inputs.
- Does not modify external variables.
- Does not perform side effects during rendering.

Example:

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}
```

Given the same `name`, the component always renders the same output.

---

# Impure Component Example

❌ Avoid this:

```jsx
let counter = 0;

function App() {
  counter++;

  return <h1>{counter}</h1>;
}
```

This component changes an external variable while rendering.

Rendering should remain pure.

---

# Props

Components receive data through **props**.

Example:

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

Using the component:

```jsx
<Button text="Save" />
<Button text="Delete" />
```

Props make components reusable.

---

# State

Some components need to remember information.

That information is stored in **state**.

Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <button>{count}</button>;
}
```

Unlike props, state belongs to the component itself.

---

# Component Tree

Every React application forms a tree of components.

Example:

```text
App
├── Navbar
├── Hero
├── Products
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer
```

React renders the UI by traversing this component tree.

---

# Separation of Concerns

Each component should focus on one responsibility.

❌ Bad

```text
App

- Navbar
- Products
- Cart
- Footer
- Login
- Search
- Modal
```

Everything is inside one component.

---

✅ Better

```text
App
├── Navbar
├── Search
├── Products
├── Cart
├── Footer
```

Each component has a single responsibility.

---

# Functional Components

Modern React uses **Functional Components**.

Example:

```jsx
function Button() {
  return <button>Click Me</button>;
}
```

Older React applications may use **Class Components**, but functional components are now the standard because they are simpler and work with Hooks.

---

# Component File Structure

A common project structure:

```text
src
│
├── App.jsx
│
├── components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   └── ProductCard.jsx
│
└── main.jsx
```

Keeping components in separate files improves maintainability.

---

# Exporting Components

To use a component in another file, export it.

```jsx
function Header() {
  return <h1>React</h1>;
}

export default Header;
```

Import it where needed.

```jsx
import Header from "./Header";
```

---

# Best Practices

✅ Keep components small.

✅ One component should have one responsibility.

✅ Use meaningful component names.

✅ Start component names with uppercase letters.

✅ Reuse components instead of duplicating code.

✅ Keep rendering pure.

✅ Split large components into smaller ones.

---

# Common Mistakes

❌ Creating one giant component.

❌ Using lowercase component names.

❌ Duplicating UI instead of creating reusable components.

❌ Putting unrelated logic in the same component.

❌ Performing side effects during rendering.

---

# Interview Notes

### What is a React component?

A reusable JavaScript function that returns JSX and represents part of the user interface.

---

### Why do component names start with uppercase letters?

React uses uppercase names to distinguish custom components from built-in HTML elements.

---

### What are the benefits of components?

- Reusability
- Maintainability
- Scalability
- Readability
- Separation of concerns

---

### What is Component Composition?

Building complex interfaces by combining smaller, reusable components.

---

### What is the difference between props and state?

**Props**

- Passed from parent to child.
- Read-only.
- Used to configure components.

**State**

- Managed inside the component.
- Can change over time.
- Causes the component to re-render when updated.

---

### What is a pure component?

A component that always returns the same UI for the same props and state and does not produce side effects during rendering.

---

# Key Takeaways

- Components are the building blocks of React applications.
- A component is a JavaScript function that returns JSX.
- Components must start with uppercase letters.
- Components should be reusable and independent.
- Components can be nested inside other components.
- React applications are organized as a component tree.
- Components receive data through props.
- Components manage their own data with state.
- Functional components are the modern standard in React.
- Keep components small, reusable, and focused on a single responsibility.