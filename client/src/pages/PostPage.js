import { formatISO9075 } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from 'UserContext';
import { baseURL } from './../services/config';;

export default function PostPage() {
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Fetch has to be ignored in case it's unmounted
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/posts/${id}`, {
          signal: controller.signal,
          credentials: 'include',
        });
        const responseJSON = await response.json();
        setPostInfo(responseJSON);
      } catch (error) { }
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
              <Link className="delete-btn" onClick={deletedPost} to={'/'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete your post
              </Link>
              {/* <a className="edit-btn">delete post</a> */}
            </div>
          )}
        <div className="image">
          <img
            // src={`http://localhost:4000/${postInfo.post.cover}`}
            src={`${baseURL}/${postInfo.post.cover}`}
            alt="Post cover"
          />
        </div>
        <div className="content" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
  async function deletedPost() {
    const response = await fetch(`${baseURL}/api/v1/posts/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
  }
}
