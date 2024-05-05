import { UserContext } from 'UserContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  // we'll no longer use it since the context provides this information
  // const [username, setUsername] = useState(null);
  // taking information about the user with useContext
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    // our fetch function will take the response with then()
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((response) => {
      // response parsed to json
      response.json().then((userInfo) => {
        // Set the username
        // this setUsername won't come from useState but from useContext
        // setUsername(userInfo.username);
        setUserInfo(userInfo);
      });
    });
  });

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
