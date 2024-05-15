import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    // Fetch has to be ignored in case it's unmounted
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          signal: controller.signal,
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
      } catch (error) {}
    };
    fetchData();
    return () => {
      controller.abort();
    };
  });
  return <div>this post page works</div>;
}
