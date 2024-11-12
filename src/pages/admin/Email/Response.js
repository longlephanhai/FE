import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios';
import React, { useState } from 'react'
import Summary from '../../../API';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

const Response = () => {
  const location = useLocation();
  const { title, id } = location.state
  console.log(title, id);

  const params = useParams()
  const email = params.email
  const [data, setData] = useState({
    title: title,
    description: '',
    email: email,
    id: id
  })
  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      description: content
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(Summary.responseEmail.url, data, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Đến</label>
          <input type="email" id="email" name="email" value={email} disabled />
        </div>
        <div>
          <label htmlFor="title">Tiêu đề</label>
          <input type="text" id="title" name="title" value={data.title} disabled />
        </div>
        <div>
          <label htmlFor='description' className='product__label'>Nội dung</label>
          <Editor
            apiKey='f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts'
            name="description" id="description"
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div>
          <button type="submit">Phản hồi</button>
        </div>
      </form>
    </div>
  )
}

export default Response
