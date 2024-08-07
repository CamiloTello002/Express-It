import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
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

  const onChangeFile = (e) => {
    setFile(e.target.files);
  };

  if (redirect) {
    return <Navigate to={'/'} />;
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
        Create post
      </button>
    </form>
  );
  async function createNewPost(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    file !== null && formData.append('file', file[0]);

    const response = await fetch(`${baseURL}/api/v1/create-post`, {
      method: 'POST',
      body: formData,
      // We need to send the cookie because the user information is there
      credentials: 'include',
    });
    // const responseJson = await response.json();
    if (response.ok) {
      setRedirect(true);
    }
  }
}
