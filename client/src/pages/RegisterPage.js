import { useState } from 'react';
import { baseURL } from 'config';
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const baseURL = `${API_DOMAIN}:${API_PORT}`;
  // const baseURL = 'http://localhost:4000';
  const path = '/register';
  const URLToAPI = new URL(path, baseURL);

  // function to trigger when the form is submitted
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch(`${baseURL}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    alert(
      `Registration ${
        response.ok ? 'successful :). You can now log in' : 'failed :('
      }`
    );
  }

  return (
    <form onSubmit={register} className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        // When there's a change in the field
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
