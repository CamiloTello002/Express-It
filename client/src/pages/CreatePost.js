import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
// with doing export default function, we can smell a component about to be created
export default function CreatePost() {
  const [value, setValue] = useState('');
  return (
    <form>
      <input type="title" placeholder={'Title'} />
      <input type="summary" placeholder={'Summary'} />
      <input type="file" />
      {/* <textarea name="" id=""></textarea> */}
      <ReactQuill />
      <button style={{ marginTop: '7px' }}>Create post</button>
    </form>
  );
}
