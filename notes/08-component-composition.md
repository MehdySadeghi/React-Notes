# Component Composition

Component Composition is the process of building larger and more complex user interfaces by combining smaller, reusable components.

Instead of creating one large component that handles everything, React encourages splitting the UI into multiple components, each with a single responsibility.

React applications are essentially trees of composed components.

---

# Why Do We Need Component Composition?

Imagine building an e-commerce website using only one component.

```text
App

- Navbar
- Sidebar
- Product List
- Product Card
- Shopping Cart
- Footer
- Login Modal
- Search Bar
- Checkout
```

As the application grows, this component becomes difficult to:

- Read
- Maintain
- Debug
- Reuse

Instead, divide the application into smaller components.

```text
App
│
├── Navbar
│   ├── Logo
│   └── Navigation
│
├── Main
│   ├── Sidebar
│   ├── ProductList
│   │   ├── ProductCard
│   │   ├── ProductCard
│   │   └── ProductCard
│   └── Cart
│
└── Footer
```

This is called **Component Composition**.

---

# Benefits of Component Composition

Component composition makes applications:

- More reusable
- Easier to understand
- Easier to maintain
- Easier to test
- More scalable

---

# Thinking in Components

Instead of thinking about an entire page, think about individual pieces.

Example:

A portfolio website

```text
Portfolio

- Header
- Hero
- About
- Skills
- Projects
- Contact
- Footer
```

Each section can become its own component.

---

# Components Should Have One Responsibility

A good component should focus on one task only.

Example:

```jsx
function Button({ children }) {
  return <button>{children}</button>;
}
```

The Button component only renders a button.

It should not:

- Fetch data
- Handle authentication
- Display notifications

Those responsibilities belong elsewhere.

This follows the **Single Responsibility Principle (SRP).**

---

# Building Components from Small to Large

Large interfaces are built by composing smaller components.

Example:

```text
App
│
├── Header
│   ├── Logo
│   └── Navigation
│
├── Main
│   ├── Hero
│   ├── Features
│   ├── Testimonials
│   └── Pricing
│
└── Footer
```

Each component can itself contain more components.

---

# Reusing Components

Instead of writing multiple similar components,

❌

```jsx
<LoginButton />

<RegisterButton />

<LogoutButton />
```

Create one reusable component.

```jsx
<Button>
  Login
</Button>

<Button>
  Register
</Button>

<Button>
  Logout
</Button>
```

---

# Component Hierarchy

Every React application forms a hierarchy.

Example:

```text
App
│
├── Header
│
├── Main
│   ├── Search
│   ├── Filters
│   ├── ProductList
│   │   ├── Product
│   │   ├── Product
│   │   └── Product
│   └── Cart
│
└── Footer
```

Data generally flows **downward** through this hierarchy.

---

# Parent and Child Components

A component that renders another component is called the **parent**.

The rendered component is called the **child**.

Example:

```jsx
function App() {
  return <Header />;
}
```

Here:

- `App` is the parent.
- `Header` is the child.

---

# Composition with Props

Composition becomes powerful when components receive props.

Example:

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

Usage:

```jsx
<Button text="Save" />

<Button text="Delete" />

<Button text="Cancel" />
```

The same component produces different UI.

---

# Composition with Children

One of the most common composition patterns uses the special `children` prop.

Example:

```jsx
<Card>
  <h2>React</h2>
  <p>Learning Component Composition</p>
</Card>
```

Component:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

Output:

```text
+--------------------------+
| React                    |
| Learning Component...    |
+--------------------------+
```

This makes wrapper components extremely flexible.

---

# Specialization vs Configuration

There are two common ways to reuse components.

## 1. Configuration (Preferred)

Configure one generic component using props.

Example:

```jsx
<Button variant="primary">
  Save
</Button>

<Button variant="secondary">
  Cancel
</Button>
```

---

## 2. Specialization

Create a specialized component using another component.

Example:

```jsx
function PrimaryButton(props) {
  return (
    <Button
      variant="primary"
      {...props}
    />
  );
}
```

The specialized component is built from the generic one.

---

# Composition vs Inheritance

React recommends **Composition** instead of **Inheritance**.

Instead of creating large inheritance hierarchies,

```text
Button

↓

PrimaryButton

↓

RoundedPrimaryButton

↓

RoundedLargePrimaryButton
```

React prefers:

```text
Button

↓

Configured with props

↓

Composed with other components
```

Composition is simpler, more flexible, and easier to maintain.

---

# Passing Components as Props

Components themselves can be passed as props.

Example:

```jsx
function Modal({ footer }) {
  return (
    <>
      <main>Content</main>

      {footer}
    </>
  );
}
```

Usage:

```jsx
<Modal
  footer={<Button>Close</Button>}
/>
```

This makes components highly customizable.

---

# Keeping Components Small

A component should generally become smaller when it starts doing multiple unrelated things.

Instead of:

```text
ProductPage

- Search
- Filters
- Products
- Cart
- Checkout
- Footer
```

Split it into:

```text
ProductPage
│
├── Search
├── Filters
├── Products
├── Cart
└── Footer
```

Smaller components are easier to reuse.

---

# Best Practices

✅ Build small, reusable components.

✅ Give every component one responsibility.

✅ Prefer composition over inheritance.

✅ Use props to configure components.

✅ Use `children` for wrapper components.

✅ Keep the component tree organized.

---

# Common Mistakes

❌ Creating very large components.

❌ Duplicating UI instead of composing components.

❌ Giving one component multiple unrelated responsibilities.

❌ Deeply nesting components without a good reason.

❌ Creating specialized components when a configurable component would be enough.

---

# Interview Notes

### What is Component Composition?

Component Composition is the practice of building complex user interfaces by combining smaller, reusable components.

---

### Why is Component Composition important?

It improves:

- Reusability
- Maintainability
- Readability
- Scalability
- Testability

---

### What is the relationship between parent and child components?

A parent component renders one or more child components.

---

### What is the `children` prop used for?

It allows a component to render whatever JSX is placed between its opening and closing tags.

---

### Why does React recommend composition over inheritance?

Composition is more flexible, easier to understand, and better suited to building reusable user interfaces.

---

### What is the Single Responsibility Principle?

Each component should focus on one responsibility or one piece of functionality.

---

# Key Takeaways

- Component Composition is the foundation of React applications.
- Complex interfaces are built from small, reusable components.
- Every component should have a single responsibility.
- Components can be composed using props and the `children` prop.
- Data generally flows from parent components to child components.
- Prefer configuration with props over creating many specialized components.
- React recommends composition instead of inheritance.
- Small, focused components are easier to maintain, reuse, and test.
- A well-designed component tree makes applications more scalable.