# Props

Props (**Properties**) are the mechanism React uses to pass data from a **parent component** to a **child component**.

Props make components reusable because the same component can display different data depending on the props it receives.

Think of props as **arguments passed to a function**.

---

# Why Do We Need Props?

Without props, every component would always display the same information.

Example:

```jsx
function Button() {
  return <button>Click Me</button>;
}
```

Every button would always display **"Click Me"**.

With props:

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

Now we can reuse the same component with different values.

```jsx
<Button text="Login" />
<Button text="Register" />
<Button text="Logout" />
```

---

# How Props Work

Props are passed from a parent component to a child component.

```text
Parent Component
        │
        │ passes props
        ▼
Child Component
```

Example:

```jsx
function App() {
  return <User name="Mehdy" />;
}

function User(props) {
  return <h1>{props.name}</h1>;
}
```

Output

```text
Mehdy
```

---

# Props are Read-Only

Props should **never** be modified by the child component.

❌ Incorrect

```jsx
function User(props) {
  props.name = "John";

  return <h1>{props.name}</h1>;
}
```

React expects props to be **immutable**.

If you need to change data, update the parent's state instead.

---

# Receiving Props

## Using the props object

```jsx
function User(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age}</p>
    </div>
  );
}
```

---

## Using Destructuring (Recommended)

```jsx
function User({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  );
}
```

Destructuring makes the code shorter and easier to read.

---

# Passing Multiple Props

A component can receive as many props as needed.

```jsx
<User
  name="Mehdy"
  age={22}
  country="Iran"
/>
```

Receiving them

```jsx
function User({ name, age, country }) {
  return (
    <>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{country}</p>
    </>
  );
}
```

---

# Passing Different Data Types

Props can contain almost any JavaScript value.

## String

```jsx
<Button text="Save" />
```

---

## Number

```jsx
<User age={22} />
```

---

## Boolean

```jsx
<Button disabled={true} />
```

or simply

```jsx
<Button disabled />
```

---

## Array

```jsx
<List items={["React", "JavaScript"]} />
```

---

## Object

```jsx
<User
  person={{
    name: "Mehdy",
    age: 22,
  }}
/>
```

---

## Function

```jsx
<Button onClick={handleClick} />
```

---

## JSX

```jsx
<Card title={<h2>React</h2>} />
```

---

# Passing JavaScript Expressions

Use curly braces.

```jsx
<User age={18 + 4} />
```

```jsx
<User isLoggedIn={true} />
```

```jsx
<Product price={price * quantity} />
```

---

# Default Props

Sometimes a prop may not be passed.

You can assign a default value.

```jsx
function Button({ text = "Click" }) {
  return <button>{text}</button>;
}
```

Using

```jsx
<Button />
```

Output

```text
Click
```

---

# The children Prop

Everything placed between a component's opening and closing tags becomes the special `children` prop.

Example

```jsx
<Card>
  <h2>React</h2>
  <p>Learning Props</p>
</Card>
```

Receiving it

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

Output

```text
+---------------------+
| React               |
| Learning Props      |
+---------------------+
```

The `children` prop is commonly used to build reusable layout components.

---

# Props Flow in One Direction

React uses **one-way data flow**.

```text
Parent
   │
   ▼
Child
```

Data always flows **from parent to child**.

A child cannot directly change a parent's props.

---

# Updating Props

Props themselves never change.

When the parent's state changes, the parent re-renders and passes **new props** to the child.

Example

```jsx
function App() {
  const [count, setCount] = useState(0);

  return <Counter value={count} />;
}
```

Every time `count` changes, `Counter` receives a new prop.

---

# Props vs State

| Props | State |
|--------|-------|
| Passed from parent | Owned by component |
| Read-only | Mutable |
| Configure a component | Store changing data |
| External data | Internal data |

---

# Component Reusability with Props

Instead of creating multiple components

❌

```jsx
<LoginButton />

<LogoutButton />

<RegisterButton />
```

Create one reusable component.

```jsx
<Button text="Login" />

<Button text="Logout" />

<Button text="Register" />
```

This is one of the biggest advantages of React.

---

# Best Practices

✅ Destructure props whenever possible.

✅ Keep props immutable.

✅ Pass only the data a component needs.

✅ Use meaningful prop names.

✅ Keep components reusable.

✅ Use `children` for wrapper/layout components.

---

# Common Mistakes

❌ Modifying props.

❌ Passing unnecessary props.

❌ Forgetting to destructure props.

❌ Creating many similar components instead of one reusable component.

❌ Confusing props with state.

---

# Interview Notes

### What are props?

Props are read-only values passed from a parent component to a child component.

---

### Why do we use props?

Props allow components to become reusable by displaying different data depending on what they receive.

---

### Can a child component modify its props?

No.

Props are immutable.

If data needs to change, the parent should update its state and pass new props.

---

### What is one-way data flow?

Data only flows from parent components to child components.

Children receive data but cannot directly modify the parent's data.

---

### What is the `children` prop?

`children` is a special prop that represents everything placed between a component's opening and closing tags.

Example:

```jsx
<Card>
  <h1>Hello</h1>
</Card>
```

`<h1>Hello</h1>` becomes the `children` prop.

---

### What is the difference between props and state?

**Props**

- Passed by the parent
- Read-only
- Used to configure components

**State**

- Managed inside the component
- Can change over time
- Triggers re-renders when updated

---

# Key Takeaways

- Props stand for **Properties**.
- Props allow data to flow from parent to child.
- Props are read-only.
- Components become reusable through props.
- Props can store any JavaScript value.
- Destructuring props improves readability.
- `children` is a special prop used for component composition.
- React follows one-way data flow.
- State changes in the parent cause new props to be passed to children.
- Never modify props directly.