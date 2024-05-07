import { UserContext } from 'UserContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  // user information provided by a parent component
  const { setUserInfo, userInfo } = useContext(UserContext);
  // set a side effect when rendering the component
  useEffect(() => {
    // instace of abort controller
    const controller = new AbortController();
    // function for fetching data from API
    const fetchData = async () => {
      try {
        // make the request to the API and save the response
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
          signal: controller.signal,
        });
        // json-ize the response
        const json = await response.json();
        // extract the username from the response and set it to the userInfo state
        setUserInfo(json.username);
      } catch (err) {}
    };
    // run the function that makes the request to the API and
    // changes the userInfo state
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

  const username = userInfo;
  console.log('the username is...');
  console.log(username);

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
