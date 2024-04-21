import { useState } from 'react';
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = 'http://localhost:4000';
  const URLToAPI = new URL('/register', baseURL);

  async function register(ev) {
    ev.preventDefault();
    await fetch(URLToAPI, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return (
    <form onSubmit={register} className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      {/* <input type="password" placeholder="······" /> */}
      <button>Register</button>
    </form>
  );
}
