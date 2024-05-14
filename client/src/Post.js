import { formatISO9075 } from 'date-fns';

export default function Post({ title, summary, createdAt, cover, author }) {
  // console.log(typeof author);
  // console.log(typeof author.username);

  return (
    <div className="post">
      <div className="image">
        <img
          src="https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg"
          // src=""
          alt=""
        />
      </div>
      <div className="texts">
        {/* <h2>theprimeagen is a good programmer</h2> */}
        <h2>{title}</h2>
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
