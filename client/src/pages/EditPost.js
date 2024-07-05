import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import { baseURL } from './../services/config';;

// include modules (for customization)
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

// include formats (for customization)
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

// with doing export default function, we can smell a component about to be created
export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  // TODO: get post information right when the component is mounted
  // 1) get the id
  //   console.log(id);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        // 1) request data from the post
        const response = await fetch(`${baseURL}/api/v1/posts/${id}`, {
          signal: controller.signal,
        });
        // 2) jsonize it
        const responseJSON = await response.json();
        setTitle(responseJSON.post.title);
        setSummary(responseJSON.post.summary);
        setContent(responseJSON.post.content);
        // 3) update
      } catch (error) { }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  const onChangeFile = (e) => {
    setFile(e.target.files);
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  // finally return the rendered component
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      {/* This is the input file where we'll get the blob. */}
      <input type="file" onChange={onChangeFile} />
      {/* <textarea name="" id=""></textarea> */}
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: '7px' }} type="submit">
        Edit post
      </button>
    </form>
  );
  async function createNewPost(ev) {
    ev.preventDefault();
    // 1) create form
    const formData = new FormData();
    // const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    file !== null && formData.append('file', file[0]);
    file !== null && console.log(file);
    const response = await fetch(`${baseURL}/api/v1/post/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) setRedirect(true);
  }
}
