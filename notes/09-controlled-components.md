# Controlled Components

A **Controlled Component** is a form element whose value is controlled by React state.

Instead of letting the browser manage the value of an input, React becomes the **single source of truth**.

Whenever the user types, React updates the state, and the state updates the UI.

---

# Why Do We Need Controlled Components?

By default, HTML inputs manage their own state.

Example:

```html
<input type="text" />
```

The browser stores whatever the user types.

React has no control over that value.

In React applications, we usually want to:

- Validate user input.
- Display the current value elsewhere.
- Submit data.
- Reset forms.
- Disable buttons.
- Perform searches while typing.

To do that, React needs to control the input.

---

# How Controlled Components Work

A controlled component follows this flow:

```text
User Types
      │
      ▼
onChange Event
      │
      ▼
setState()
      │
      ▼
React Updates State
      │
      ▼
Component Re-renders
      │
      ▼
Input Receives New Value
```

React is always in control.

---

# Creating a Controlled Input

```jsx
function App() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <input
      type="text"
      value={name}
      onChange={handleChange}
    />
  );
}
```

Here:

- `value` comes from React state.
- `onChange` updates the state.
- The input always displays the current state value.

---

# Understanding value

The `value` prop tells React what should appear inside the input.

```jsx
<input value={name} />
```

If `name` changes,

React updates the input automatically.

---

# Understanding onChange

`onChange` runs every time the user changes the input.

```jsx
function handleChange(event) {
  setName(event.target.value);
}
```

`event.target.value` contains the current text inside the input.

---

# The Two Essential Parts

Every controlled input needs two things.

1. A value.

```jsx
value={name}
```

2. A way to update that value.

```jsx
onChange={handleChange}
```

Without either one, the input is incomplete.

---

# Multiple Controlled Inputs

Each input usually has its own state.

```jsx
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />
    </>
  );
}
```

---

# Using One State Object

For larger forms, storing everything inside one object is common.

```jsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
});
```

Updating one field:

```jsx
function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
}
```

Inputs:

```jsx
<input
  name="name"
  value={formData.name}
  onChange={handleChange}
/>

<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>
```

---

# Controlled Textarea

```jsx
const [message, setMessage] = useState("");

<textarea
  value={message}
  onChange={(e) =>
    setMessage(e.target.value)
  }
/>
```

Just like an input.

---

# Controlled Select

```jsx
const [country, setCountry] =
  useState("USA");

<select
  value={country}
  onChange={(e) =>
    setCountry(e.target.value)
  }
>
  <option>USA</option>
  <option>Canada</option>
  <option>Germany</option>
</select>
```

---

# Controlled Checkbox

Checkboxes use `checked` instead of `value`.

```jsx
const [accepted, setAccepted] =
  useState(false);

<input
  type="checkbox"
  checked={accepted}
  onChange={(e) =>
    setAccepted(e.target.checked)
  }
/>
```

---

# Form Submission

Example:

```jsx
function App() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button>
        Submit
      </button>
    </form>
  );
}
```

---

# Resetting a Form

Since React owns the state,

resetting a form is simple.

```jsx
setName("");
```

or

```jsx
setFormData({
  name: "",
  email: "",
});
```

The UI updates automatically.

---

# Live Validation

Controlled components make validation easy.

```jsx
const isValid =
  name.length >= 3;
```

```jsx
<button disabled={!isValid}>
  Submit
</button>
```

The button becomes enabled only when the input is valid.

---

# Live Search

Controlled inputs are useful for search bars.

```jsx
const [query, setQuery] =
  useState("");
```

Every time the user types,

the search results can update immediately.

---

# Controlled vs Uncontrolled Components

## Controlled Components

- Managed by React state.
- React is the source of truth.
- Easier validation.
- Easier form handling.
- Easier debugging.

---

## Uncontrolled Components

- Managed by the browser.
- Data is accessed using refs.
- Simpler for very small forms.
- Less common in React applications.

---

# Advantages of Controlled Components

- Single source of truth.
- Predictable behavior.
- Easy validation.
- Easy resetting.
- Easy conditional rendering.
- Easy form submission.
- Easier debugging.

---

# Disadvantages

- More code.
- Every keystroke causes a re-render.
- Large forms may require more state management.

For most React applications, the advantages outweigh the disadvantages.

---

# Best Practices

✅ Make React the single source of truth.

✅ Keep form state organized.

✅ Use one state object for larger forms.

✅ Validate user input while typing.

✅ Reset forms by updating state.

---

# Common Mistakes

❌ Forgetting `onChange`.

```jsx
<input value={name} />
```

The input becomes read-only.

---

❌ Updating state directly.

```jsx
name = "John";
```

Use the setter function instead.

---

❌ Forgetting `event.preventDefault()` on form submission.

---

❌ Mutating state objects directly.

---

# Interview Notes

### What is a Controlled Component?

A form element whose value is controlled by React state instead of the browser.

---

### Why do we use Controlled Components?

Because they make forms predictable and easier to validate, submit, reset, and debug.

---

### What are the two essential parts of a Controlled Component?

- A `value` (or `checked` for checkboxes).
- An `onChange` handler that updates state.

---

### What is the source of truth in a Controlled Component?

React state.

---

### What is the difference between Controlled and Uncontrolled Components?

**Controlled**

- Managed by React state.
- React controls the value.
- Easier validation and form management.

**Uncontrolled**

- Managed by the browser.
- Values are accessed with refs.
- Less commonly used in modern React.

---

### Why does an input become read-only when using `value` without `onChange`?

Because React controls the input's value, but without an `onChange` handler, the state never updates, so the displayed value never changes.

---

# Key Takeaways

- Controlled Components are controlled by React state.
- React becomes the single source of truth.
- Every controlled input needs a `value` (or `checked`) and an `onChange` handler.
- State updates trigger re-renders, keeping the UI synchronized with the current state.
- Controlled Components simplify validation, form submission, resetting, and debugging.
- Checkboxes use `checked` instead of `value`.
- Large forms are often managed using a single state object.
- Controlled Components are the recommended approach for handling forms in React.