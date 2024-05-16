import { UserContext } from 'UserContext';
import { formatISO9075 } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
              <Link className="edit-btn" to={`/edit/${postInfo.post._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit your post
              </Link>
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
