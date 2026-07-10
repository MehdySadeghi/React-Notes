const fruits = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Orange" },
  { id: 3, name: "Banana" },
];

export default function App() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  );
}
