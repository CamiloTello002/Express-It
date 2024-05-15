import { UserContext } from 'UserContext';
import { API_DOMAIN, API_PORT } from 'config';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const baseURL = `${API_DOMAIN}:${API_PORT}`;
  const path = '/profile';
  const pathLogout = '/logout';
  // const URLToAPI = new URL(path, baseURL);
  // const URLToAPILogout = new URL(pathLogout, baseURL);
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    // Fetch has to be ignored in case it's unmounted
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        // User data is in the SERVER
        const response = await fetch(`${baseURL}${path}`, {
          credentials: 'include',
          signal: controller.signal,
        });
        // Useful for setting user information
        const json = await response.json();
        setUserInfo(json);
      } catch (err) {}
    };
    // useEffect DOESN'T allow async functions as first parameter,
    // so a separate function was needed
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  function logout() {
    fetch(`${baseURL}${pathLogout}`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  // userInfo might be returned as empty object
  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Pocho Blogs
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
            {/* <a href="/" onClick={logout}>
              Logout
            </a> */}
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
