import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { baseURL } from './../services/config';;

export default function IndexPage() {

  // Initially an empty array
  const [blogPosts, setBlogPosts] = useState([]);

  // Function that's run right after the rendering
  useEffect(() => {
    const controller = new AbortController();

    // Define async function and run it
    const fetchData = async () => {
      try {
        const posts = await fetch(`${baseURL}/api/v1/posts`, {
          credentials: 'include',
          signal: controller.signal,
          method: 'GET',
        });
        const postsJSON = await posts.json();
        setBlogPosts(postsJSON.posts);
        console.log(postsJSON.posts)
      } catch (error) { }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  return (

    <>
      {blogPosts.length > 0 && blogPosts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
