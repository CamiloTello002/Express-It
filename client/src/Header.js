import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // our fetch function will take the response with then()
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((response) => {
      // response parsed to json
      response.json().then((userInfo) => {
        // Set the username
        setUsername(userInfo.username);
      });
    });
  });

  // What the logout function will do is to invalidate the cookie.
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUsername(null);
  }

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
