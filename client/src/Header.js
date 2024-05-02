import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const domain = 'http://localhost:4000';
  const URLToAPI = new URL('/profile', domain);
  // run every time we mount this component
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000/profile', {
        credentials: 'include',
      });
      console.log(response);
    }
    fetchData();
  }, []);
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
