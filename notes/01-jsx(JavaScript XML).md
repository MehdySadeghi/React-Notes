# JSX (JavaScript XML)

JSX is a syntax extension for JavaScript that allows us to write HTML-like code inside JavaScript.

It makes building user interfaces easier and more readable by combining markup and JavaScript in one place.

Although JSX looks like HTML, it is **not HTML**. It is syntax that React transforms into JavaScript.

---

# Why Do We Need JSX?

Without JSX, creating React elements would require using `React.createElement()`.

Example without JSX:

```javascript
const element = React.createElement(
  "h1",
  null,
  "Hello, React!"
);
```

The same code using JSX:

```jsx
const element = <h1>Hello, React!</h1>;
```

JSX is much easier to read, write, and maintain.

---

# How JSX Works

Browsers cannot understand JSX directly.

When your project is built, tools like **Babel** transform JSX into regular JavaScript.

Example:

JSX

```jsx
const element = <h1>Hello World</h1>;
```

Compiled JavaScript

```javascript
const element = React.createElement(
  "h1",
  null,
  "Hello World"
);
```

React then uses these objects to build the Virtual DOM.

---

# JSX Rules

## 1. Return a Single Parent Element

Every component must return one parent element.

❌ Incorrect

```jsx
return (
  <h1>Hello</h1>
  <p>Welcome</p>
);
```

✅ Correct

```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>Welcome</p>
  </div>
);
```

or

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);
```

The empty tags (`<> </>`) are called **Fragments**.

Fragments group multiple elements without creating an extra DOM node.

---

## 2. Close Every Tag

Unlike HTML, every JSX tag must be properly closed.

❌ Incorrect

```jsx
<img src="photo.jpg">
```

✅ Correct

```jsx
<img src="photo.jpg" />
```

Another example:

```jsx
<input />
```

```jsx
<br />
```

```jsx
<hr />
```

---

## 3. Use camelCase for Attributes

HTML attributes sometimes have different names in JSX because they become JavaScript object properties.

| HTML | JSX |
|------|-----|
| class | className |
| for | htmlFor |
| tabindex | tabIndex |
| onclick | onClick |

Example:

```jsx
<div className="card">
  Hello
</div>
```

---

## 4. JavaScript Goes Inside Curly Braces

JSX allows JavaScript expressions inside `{}`.

```jsx
const name = "Mehdy";

<h1>Hello {name}</h1>;
```

Expressions can be:

```jsx
{2 + 3}
```

```jsx
{name.toUpperCase()}
```

```jsx
{Math.random()}
```

```jsx
{isLoggedIn ? "Logout" : "Login"}
```

---

## 5. JSX is an Expression

Since JSX itself is an expression, it can be:

Stored in variables

```jsx
const heading = <h1>Hello</h1>;
```

Returned from functions

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

Passed as props

```jsx
<Card title={<h2>React</h2>} />
```

---

## 6. Inline Styling Uses Objects

Instead of writing CSS as a string, JSX expects a JavaScript object.

HTML

```html
<div style="color:red;"></div>
```

JSX

```jsx
<div style={{ color: "red" }}></div>
```

Multiple properties

```jsx
<div
  style={{
    color: "white",
    backgroundColor: "black",
    padding: "20px",
  }}
></div>
```

---

## 7. Comments in JSX

Use curly braces.

```jsx
{
  /* This is a comment */
}
```

Not

```html
<!-- Wrong -->
```

---

# Embedding JavaScript

You can embed any JavaScript **expression** inside JSX.

Examples

```jsx
const age = 22;

<p>{age}</p>
```

```jsx
<p>{10 * 5}</p>
```

```jsx
<p>{Date.now()}</p>
```

```jsx
<p>{user.name}</p>
```

```jsx
<p>{products.length}</p>
```

---

# Expressions vs Statements

Only JavaScript **expressions** can be used inside JSX.

✅ Expressions

```jsx
{name}
```

```jsx
{age + 5}
```

```jsx
{isLoggedIn && "Welcome"}
```

```jsx
{isLoggedIn ? "Logout" : "Login"}
```

❌ Statements

```jsx
if (...) {}
```

```jsx
for (...) {}
```

```jsx
switch (...) {}
```

Instead, use expressions like:

```jsx
{condition && <Component />}
```

or

```jsx
{condition ? <A /> : <B />}
```

---

# JSX Escapes Against Injection Attacks

By default, React escapes values before rendering them.

Example:

```jsx
const text = "<script>alert('Hack')</script>";

<p>{text}</p>;
```

React displays:

```text
<script>alert('Hack')</script>
```

instead of executing it.

This helps protect against **Cross-Site Scripting (XSS)** attacks.

---

# Babel

Babel is a JavaScript compiler.

Its job is to transform modern JavaScript and JSX into JavaScript that browsers understand.

Example:

```jsx
<h1>Hello</h1>
```

↓

```javascript
React.createElement(...)
```

---

# Virtual DOM

JSX creates React elements.

React uses these elements to build the **Virtual DOM**, which is a lightweight JavaScript representation of the real DOM.

React compares the new Virtual DOM with the previous one and only updates what has changed.

This process is called **Reconciliation**.

---

# Best Practices

✅ Keep JSX clean and readable.

✅ Move complex logic outside JSX.

✅ Use meaningful component names.

✅ Use Fragments instead of unnecessary `<div>` wrappers.

✅ Keep components small and focused.

✅ Use camelCase for attributes.

---

# Common Mistakes

❌ Returning multiple root elements.

❌ Forgetting to close tags.

❌ Using `class` instead of `className`.

❌ Using `for` instead of `htmlFor`.

❌ Writing JavaScript statements inside JSX.

❌ Putting too much logic directly inside JSX.

---

# Interview Notes

### What is JSX?

A syntax extension for JavaScript that allows developers to write HTML-like syntax inside JavaScript. JSX is compiled into `React.createElement()` calls before being executed.

---

### Is JSX required to use React?

No.

React can be written entirely using `React.createElement()`, but JSX makes code significantly easier to read and write.

---

### Can browsers understand JSX?

No.

Browsers only understand JavaScript. JSX must first be compiled by tools like Babel.

---

### Why do we use `className` instead of `class`?

Because `class` is a reserved keyword in JavaScript. React uses `className` to assign CSS classes.

---

### Why do we use curly braces in JSX?

Curly braces allow JavaScript expressions to be embedded inside JSX.

---

# Key Takeaways

- JSX is a syntax extension for JavaScript.
- JSX is not HTML.
- JSX is compiled into `React.createElement()`.
- JSX improves readability and developer experience.
- Every component returns one parent element.
- All tags must be closed.
- JavaScript expressions go inside `{}`.
- Use `className` instead of `class`.
- Use `htmlFor` instead of `for`.
- Inline styles use JavaScript objects.
- React escapes values to help prevent XSS attacks.
- React uses JSX to create React elements, which are used to build the Virtual DOM.