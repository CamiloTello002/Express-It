import { UserContext } from 'UserContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
          signal: controller.signal,
        });
        const json = await response.json();
        console.log(json);
      } catch (err) {}
    };
    fetchData();

    // return the cleanup function
    return () => {
      controller.abort();
    };
  }, []); // empty dependency array means effect runs only once

  // What the logout function will do is to invalidate the cookie.
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

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
