function Welcome({ loggedIn }) {
  return <h2>{loggedIn ? "Welcome Back!" : "Please Log In"}</h2>;
}

export default function App() {
  return <Welcome loggedIn={true} />;
}
