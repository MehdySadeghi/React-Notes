import { useState } from "react";

const products = ["React", "JavaScript", "CSS", "HTML"];

function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

function ProductList({ query }) {
  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product}>{product}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <ProductList query={query} />
    </>
  );
}
