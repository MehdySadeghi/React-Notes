function User({ name, age }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

export default function App() {
  return (
    <>
      <User name="Mehdy" age={22} />
      <User name="Jonas" age={35} />
    </>
  );
}
