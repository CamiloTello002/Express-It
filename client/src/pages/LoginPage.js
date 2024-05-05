import { useState } from 'react';
import { Navigate } from 'react-router-dom';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const baseURL = 'http://localhost:4000';
  // path url is set with a callback
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
      credentials: 'include',
    });
    // alert(`Login ${response.ok ? 'successful :)' : 'failed :('}`);
    if (response.ok) {
      setRedirect(true);
    } else {
      alert('wrong credentials!');
    }

    // In case the response was successful, then we're redirected to the main page
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }
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
