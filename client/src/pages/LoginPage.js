import { useState } from 'react';
import { Navigate } from 'react-router-dom';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // initial state of redirect is false
  const [redirect, setRedirect] = useState(false);
  const baseURL = 'http://localhost:4000';
  const URLToAPI = new URL('/login', baseURL);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(URLToAPI, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response.json());
    if (response.ok) {
      // yes, we're using the function that changes the redirect state
      setRedirect(true);
    } else {
      alert('Wrong credentials!');
    }
    // alert(`Login ${response.ok ? 'successful :)' : 'failed :('}`);
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
