import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { id } = useParams();
  console.log(id);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`http://localhost:4000/post/${id}`);
  //   };
  // });
  return <div>this post page works</div>;
}
