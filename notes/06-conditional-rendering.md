# Conditional Rendering

Conditional rendering is the process of displaying different UI based on a condition.

Instead of always rendering the same elements, React allows us to decide **what should be rendered** depending on state, props, or any JavaScript expression.

---

# Why Do We Need Conditional Rendering?

Most applications display different content depending on certain conditions.

Examples:

- Show **Login** or **Logout** button.
- Display a loading spinner while fetching data.
- Show an error message if a request fails.
- Render a shopping cart only when it contains items.
- Display admin controls only for administrators.

Without conditional rendering, every part of the UI would always be visible.

---

# Conditional Rendering in React

Since JSX is JavaScript, we can use JavaScript expressions to decide what gets rendered.

Example:

```jsx
function App() {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome!</h1> : <h1>Please Log In</h1>}
    </div>
  );
}
```

---

# Rendering with if Statements

Sometimes it's easier to decide what to render before the `return`.

Example:

```jsx
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome!</h1>;
  }

  return <h1>Please Log In</h1>;
}
```

Use this approach when the rendering logic becomes complex.

---

# Ternary Operator

The ternary operator is the most common way to conditionally render JSX.

Syntax:

```javascript
condition ? valueIfTrue : valueIfFalse
```

Example:

```jsx
function App() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

---

# Rendering Nothing

Sometimes you don't want to render anything.

Return `null`.

Example:

```jsx
function Warning({ show }) {
  if (!show) return null;

  return <h2>Warning!</h2>;
}
```

When `show` is `false`, React renders nothing.

---

# Logical AND (&&)

The logical AND operator is useful when you only need to render something if a condition is true.

Syntax:

```jsx
condition && <Component />
```

Example:

```jsx
function App() {
  const isAdmin = true;

  return (
    <>
      {isAdmin && <button>Delete User</button>}
    </>
  );
}
```

If the condition is false, React renders nothing.

---

# Logical OR (||)

The logical OR operator can provide fallback values.

Example:

```jsx
<p>{username || "Guest"}</p>
```

If `username` is an empty string or another falsy value, `"Guest"` is displayed.

---

# Storing JSX in Variables

Sometimes storing JSX in a variable improves readability.

Example:

```jsx
function App() {
  const isLoggedIn = true;

  let button;

  if (isLoggedIn) {
    button = <button>Logout</button>;
  } else {
    button = <button>Login</button>;
  }

  return <div>{button}</div>;
}
```

---

# Multiple Conditions

Example:

```jsx
function Status({ score }) {
  if (score >= 90) return <h2>Excellent</h2>;

  if (score >= 70) return <h2>Good</h2>;

  return <h2>Needs Improvement</h2>;
}
```

---

# Nested Ternary Operators

Although possible, nested ternaries reduce readability.

❌ Avoid

```jsx
{
  isLoggedIn
    ? isAdmin
      ? <AdminPanel />
      : <UserPanel />
    : <Login />
}
```

✅ Better

```jsx
if (!isLoggedIn) return <Login />;

if (isAdmin) return <AdminPanel />;

return <UserPanel />;
```

---

# Conditional Rendering in Lists

Example:

```jsx
function Item({ packed }) {
  return (
    <li>
      {packed ? "✅ Packed" : "❌ Not Packed"}
    </li>
  );
}
```

---

# Using State

Conditional rendering is often based on state.

Example:

```jsx
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Products />
      )}
    </>
  );
}
```

---

# Using Props

Conditional rendering is also commonly based on props.

Example:

```jsx
function User({ isPremium }) {
  return (
    <>
      {isPremium && <PremiumBadge />}
    </>
  );
}
```

---

# Falsy Values

JavaScript considers the following values falsy:

```text
false
0
""
null
undefined
NaN
```

Example:

```jsx
{false && <h1>Hello</h1>}
```

Nothing is rendered.

---

# Be Careful with Numbers

A common mistake:

```jsx
{
  items.length && <List />
}
```

If `items.length` is `0`, React renders:

```text
0
```

Instead, write:

```jsx
{
  items.length > 0 && <List />
}
```

or

```jsx
{
  Boolean(items.length) && <List />
}
```

---

# Best Practices

✅ Use the ternary operator when choosing between two UI elements.

✅ Use `&&` when rendering something conditionally without an alternative.

✅ Return `null` when nothing should be rendered.

✅ Use `if` statements for complex rendering logic.

✅ Keep JSX clean and readable.

---

# Common Mistakes

❌ Using nested ternary operators.

❌ Writing large `if` statements directly inside JSX.

❌ Forgetting that `0` can be rendered.

❌ Making conditional rendering logic difficult to read.

---

# Interview Notes

### What is conditional rendering?

Conditional rendering is displaying different UI depending on a condition.

---

### Which operator is most commonly used?

The ternary operator.

```jsx
condition ? A : B
```

---

### When should you use `&&`?

When you only need to render something if a condition is true.

```jsx
isLoggedIn && <Profile />
```

---

### What happens if a component returns `null`?

React renders nothing.

---

### Why should nested ternary operators be avoided?

They reduce readability and make code difficult to maintain.

---

### Why is `items.length && <List />` considered a mistake?

If `items.length` is `0`, React renders `0` because `0` is a valid value in JSX.

Instead, compare explicitly:

```jsx
items.length > 0 && <List />
```

---

# Key Takeaways

- Conditional rendering allows React to display different UI based on conditions.
- Conditions are usually based on state or props.
- Use `if` statements for complex logic.
- Use the ternary operator to choose between two UI elements.
- Use `&&` to render something only when a condition is true.
- Return `null` to render nothing.
- Avoid nested ternary operators.
- Be careful when using numbers with `&&` because `0` can be rendered.
- Prioritize readability when writing conditional rendering logic.