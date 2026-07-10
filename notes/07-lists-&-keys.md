# Lists & Keys

Rendering lists is one of the most common tasks in React.

Instead of manually creating multiple components, React allows us to generate them dynamically by looping through data.

Most applications display collections of data, such as:

- Products
- Users
- Comments
- Messages
- Notifications
- Blog posts

React uses JavaScript array methods (most commonly `map()`) to render lists efficiently.

---

# Why Do We Need Lists?

Imagine displaying five products.

Without lists:

```jsx
<Product />
<Product />
<Product />
<Product />
<Product />
```

This quickly becomes impossible to maintain.

Instead, store the data in an array.

```jsx
const products = [
  "Laptop",
  "Mouse",
  "Keyboard",
  "Monitor",
  "Headphones",
];
```

Then generate the UI automatically.

---

# Rendering Lists with map()

The `map()` method creates a new array by transforming each item.

React renders the returned JSX.

Example:

```jsx
const fruits = ["Apple", "Banana", "Orange"];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}
```

Output:

```text
• Apple
• Banana
• Orange
```

---

# How map() Works

The `map()` method executes a callback function for every element in an array.

Syntax:

```javascript
array.map((item) => {
  return something;
});
```

Example:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(number => number * 2);

console.log(doubled);
```

Output:

```text
[2, 4, 6]
```

In React, instead of returning numbers, we usually return JSX.

---

# Rendering Components from Arrays

Instead of rendering HTML elements, we usually render components.

Example:

```jsx
const products = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Mouse",
  },
];
```

```jsx
function Product({ name }) {
  return <li>{name}</li>;
}

function App() {
  return (
    <ul>
      {products.map(product => (
        <Product
          key={product.id}
          name={product.name}
        />
      ))}
    </ul>
  );
}
```

---

# Keys

Whenever React renders a list, every element needs a **key**.

A key is a unique identifier that helps React identify which item corresponds to which component.

Example:

```jsx
{
  products.map(product => (
    <Product
      key={product.id}
      name={product.name}
    />
  ));
}
```

---

# Why Do We Need Keys?

Imagine this list:

```text
Apple
Banana
Orange
```

Now the user removes **Banana**.

Without keys, React may have difficulty determining which element was removed.

With keys:

```text
1 Apple
2 Banana
3 Orange
```

React immediately knows item **2** disappeared.

Keys help React update the UI efficiently.

---

# React Reconciliation

When state changes, React creates a new Virtual DOM.

React compares:

```text
Old Virtual DOM

↓

New Virtual DOM
```

This comparison process is called **Reconciliation**.

Keys help React match old elements with new ones during reconciliation.

This minimizes DOM updates and improves performance.

---

# Choosing Good Keys

The best key is a value that is:

- Unique
- Stable
- Never changes

Example:

```jsx
key={product.id}
```

Database IDs are usually perfect keys.

---

# Bad Keys

## Array Index

```jsx
key={index}
```

Avoid using indexes when the list can:

- Add items
- Remove items
- Sort items
- Filter items

Indexes change as the list changes, which can lead to incorrect UI updates and lost component state.

---

## Random Numbers

```jsx
key={Math.random()}
```

Never do this.

A new random key is generated every render.

React treats every element as completely new and re-renders the entire list.

---

# When is Using the Index Acceptable?

Using the array index is acceptable only when:

- The list is static.
- Items are never reordered.
- Items are never inserted.
- Items are never removed.

Otherwise, use a unique ID.

---

# Filtering Lists

We often filter data before rendering.

Example:

```jsx
const packedItems = items.filter(
  item => item.packed
);
```

Then render it.

```jsx
<ul>
  {packedItems.map(item => (
    <li key={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```

---

# Chaining Array Methods

React commonly combines array methods.

Example:

```jsx
items
  .filter(item => item.packed)
  .map(item => (
    <li key={item.id}>
      {item.name}
    </li>
  ));
```

This is very common in React applications.

---

# Rendering Empty Lists

Sometimes an array is empty.

Example:

```jsx
{
  items.length === 0 ? (
    <p>No items found.</p>
  ) : (
    items.map(item => (
      <Item
        key={item.id}
        item={item}
      />
    ))
  );
}
```

This provides better user feedback.

---

# Rendering Nested Lists

Lists can also contain other lists.

Example:

```jsx
const categories = [
  {
    id: 1,
    name: "Electronics",
    products: ["Laptop", "Phone"],
  },
];
```

```jsx
{
  categories.map(category => (
    <div key={category.id}>
      <h2>{category.name}</h2>

      <ul>
        {category.products.map(product => (
          <li key={product}>
            {product}
          </li>
        ))}
      </ul>
    </div>
  ));
}
```

---

# Keys Are Not Props

Keys are used internally by React.

They are **not** passed to your component.

Example:

```jsx
<Product key={1} />
```

Inside the component:

```jsx
function Product(props) {
  console.log(props.key);
}
```

Output:

```text
undefined
```

If your component needs the ID, pass it as a normal prop.

```jsx
<Product
  key={product.id}
  id={product.id}
/>
```

---

# Best Practices

✅ Use `map()` to render lists.

✅ Use stable and unique keys.

✅ Prefer IDs over indexes.

✅ Filter data before mapping when necessary.

✅ Keep rendering logic simple and readable.

---

# Common Mistakes

❌ Forgetting to provide a key.

❌ Using `Math.random()` as a key.

❌ Using the array index for dynamic lists.

❌ Assuming `key` is available inside the component.

❌ Writing overly complex rendering logic inside `map()`.

---

# Interview Notes

### Why do we use `map()` in React?

To transform an array of data into an array of JSX elements.

---

### What is a key?

A unique identifier that helps React identify list items during reconciliation.

---

### Why are keys important?

Keys help React determine:

- Which items were added.
- Which items were removed.
- Which items changed.

This allows React to update the DOM efficiently.

---

### Why shouldn't we use array indexes as keys?

Indexes change when items are inserted, removed, or reordered.

This can cause incorrect UI updates and unexpected component behavior.

---

### Can we access `key` inside a component?

No.

`key` is a special React attribute used internally and is not passed as a prop.

---

### What makes a good key?

A key should be:

- Unique
- Stable
- Consistent between renders

Database IDs are usually the best choice.

---

# Key Takeaways

- React renders collections using the `map()` method.
- `map()` transforms data into JSX.
- Every rendered list item needs a unique `key`.
- Keys help React perform efficient reconciliation.
- Prefer unique IDs over array indexes.
- Avoid `Math.random()` as a key.
- `key` is not passed to the component as a prop.
- Use `filter()` before `map()` when rendering subsets of data.
- Keep list rendering clean, simple, and readable.