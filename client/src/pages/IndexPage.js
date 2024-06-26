import { useEffect, useState } from 'react';
import Post from '../Post';
import { baseURL } from 'config';
// import { API_PORT } from 'config';

export default function IndexPage() {
  // const baseURL = `${API_DOMAIN}:${API_PORT}`;
  // const postsPath = '/posts';

  const [blogPosts, setBlogPosts] = useState([]);

  // posts must be got from the server
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // const posts = await fetch(URLToPosts, {
        const posts = await fetch(`${baseURL}/api/v1/posts`, {
          credentials: 'include',
          signal: controller.signal,
          method: 'GET',
        });
        const postsJSON = await posts.json();
        setBlogPosts(postsJSON.posts);
      } catch (error) { }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>{blogPosts.length > 0 && blogPosts.map((post) => <Post {...post} />)}</>
  );
}
