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
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
          </>
        )}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
