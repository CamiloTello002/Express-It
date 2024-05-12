import { useEffect } from 'react';
import Post from '../Post';

export default function IndexPage() {
  // fetch posts from server
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const posts = await fetch('/posts', {
          credentials: 'include',
          signal: controller.signal,
          method: 'GET',
        });
        const postsJSON = await posts.json();
        console.log(postsJSON);
      } catch (error) {}
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
