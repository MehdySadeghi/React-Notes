function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function App() {
  return (
    <Card>
      <h2>React</h2>
      <p>Composition Example</p>
    </Card>
  );
}
