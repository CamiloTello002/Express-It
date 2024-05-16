import { UserContext } from 'UserContext';
import { formatISO9075 } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Fetch has to be ignored in case it's unmounted
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          signal: controller.signal,
          credentials: 'include',
        });
        const responseJSON = await response.json();
        setPostInfo(responseJSON);
      } catch (error) {}
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  if (postInfo) {
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
        {/* {postInfo.post._id === userInfo.id && <div>edit this post</div>} */}
        {/* {Object.keys(userInfo).length > 0 && <div>there is a user!!!!!!!!</div>} */}
        {Object.keys(userInfo).length > 0 &&
          // userInfo.id === postInfo.post.author._id && <div>Edit page</div>}
          userInfo.id === postInfo.post.author._id && (
            <div className="edit-row">
              <a className="edit-btn"></a>
            </div>
          )}
        <div className="image">
          <img
            src={`http://localhost:4000/${postInfo.post.cover}`}
            alt="Post cover"
          />
        </div>
        <div className="content" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
  // return (
  //   <div>
  //     <img src={`http://localhost:4000/default.png`} />
  //   </div>
  // );
}
