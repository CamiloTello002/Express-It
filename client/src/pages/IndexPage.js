import { useEffect } from 'react';
import Post from '../Post';
import { API_DOMAIN } from 'config';
import { API_PORT } from 'config';

export default function IndexPage() {
  const baseURL = `${API_DOMAIN}:${API_PORT}`;
  const postsPath = '/posts';
  const URLToPosts = new URL(postsPath, baseURL);

  // posts must be got from the server
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const posts = await fetch(URLToPosts, {
          credentials: 'include',
          signal: controller.signal,
          method: 'GET',
        });
        const postsJSON = await posts.json();
        console.log(postsJSON);
      } catch (error) {}
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  );
}
