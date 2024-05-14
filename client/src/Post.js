import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({
  _id,
  title,
  summary,
  createdAt,
  cover,
  author,
}) {
  // console.log(typeof author);
  // console.log(typeof author.username);

  return (
    <div className="post">
      <div className="image">
        {/* <Link to={'/post/id'}> */}
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        {/* <h2>theprimeagen is a good programmer</h2> */}
        {/* <Link to={'/post/id'}> */}
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="/" className="author">
            {author.username}
          </a>
          {/* <time>2024-04-20 16:45</time> */}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
