import { useState } from 'react';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = 'http://localhost:4000';
  // const pathURL = '/login';
  // I hope this to work
  const pathURLcb = {
    toString: () => '/login',
  };
  const URLToAPI = new URL(pathURLcb, baseURL);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(URLToAPI, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    alert(`Login ${response.ok ? 'successful :)' : 'failed :('}`);
  }
  //   return <div>Login Page</div>;
  return (
    <form onSubmit={login} className="login">
      <h1>Login</h1>
      {/* <input type="text" placeholder="username" />
      <input type="password" placeholder="······" /> */}
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
      <button>Login</button>
    </form>
  );
}
