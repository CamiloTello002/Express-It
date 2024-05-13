import { useEffect, useState } from 'react';
import Post from '../Post';
import { API_DOMAIN } from 'config';
import { API_PORT } from 'config';

export default function IndexPage() {
  const baseURL = `${API_DOMAIN}:${API_PORT}`;
  const postsPath = '/posts';
  const URLToPosts = new URL(postsPath, baseURL);

  const [blogPosts, setBlogPosts] = useState([]);

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
        setBlogPosts(postsJSON);
      } catch (error) {}
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {blogPosts.length > 0 && blogPosts.map((post) => <Post {...post} />)}
      <Post />
      <Post />
    </>
  );
}
