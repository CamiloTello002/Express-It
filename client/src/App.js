import './App.css';
import Post from './Post';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Post />} />
        <Route path={'/login'} element={<div>login page</div>} />
      </Route>
      {/* <Route index element={<Post />} />
      <Route path={'/login'} element={<div>login page</div>} /> */}
    </Routes>
  );
}

export default App;
