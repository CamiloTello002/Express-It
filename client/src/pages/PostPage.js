import { formatISO9075 } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Fetch has to be ignored in case it's unmounted
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          signal: controller.signal,
        });
        const responseJSON = await response.json();
        // console.log(responseJSON);
        setPostInfo(responseJSON);
      } catch (error) {}
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  if (postInfo) {
    // console.log(postInfo);
    function createMarkup() {
      return { __html: postInfo.post.content };
    }
    return (
      <div className="post-page">
        <h1 style={{ textAlign: 'center' }}>{postInfo.post.title}</h1>
        <time>
          <strong>Published on: </strong>
          {formatISO9075(new Date(postInfo.post.createdAt))}
        </time>
        <div className="author">
          <strong>Created by:</strong> {postInfo.post.author.username}
        </div>
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.post.cover}`} />
        </div>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
  // console.log(postInfo);
  // return (
  //   <div>
  //     <img src={`http://localhost:4000/default.png`} />
  //   </div>
  // );
}
