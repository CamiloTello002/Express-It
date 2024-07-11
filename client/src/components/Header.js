import { UserContext } from 'UserContext';
import { baseURL } from './../services/config';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const pathLogout = '/api/v1/users/logout';
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/users/profile`, {
          credentials: 'include',
          signal: controller.signal,
        });
        const json = await response.json();
        setUserInfo(json);
      } catch (err) { }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  function logout() {
    fetch(`${baseURL}/api/v1/users/logout`, {
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
        <img
          src="./icon.svg"
          alt="Express It logo"
          height={'40px'}
          className="logo"
        />
        Express It
      </Link>
      <nav>
        {username && (
          <>
            <span>Hello, {username}!</span>
            <Link to="/create">Create new post</Link>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
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
