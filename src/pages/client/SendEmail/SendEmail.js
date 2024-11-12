import { Editor } from '@tinymce/tinymce-react'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './SendEmail.scss'
import axios from 'axios'
import Summary from '../../../API'
import { toast } from 'react-toastify'
const SendEmail = () => {
  const [params, setParams] = useSearchParams()
  const email = params.get("email");
  const [data, setData] = useState({
    title: '',
    description: '',
    email: email
  })
  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      description: content
    }))
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data);
    const response = await axios.post(Summary.email.url, data, { withCredentials: true })
    if (response.data.success) {
      toast.success('Gửi email thành công')
      setData({
        title: '',
        description: '',
      })
    } else {
      toast.error('Gửi email thất bại')
      setData({
        title: '',
        description: '',
      })
    }
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} disabled />
        </div>
        <div>
          <label htmlFor="title">Tiêu đề</label>
          <input type="text" id="title" name="title" value={data.title} onChange={handleOnChange} />
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
          <button type="submit">Gửi email</button>
        </div>
      </form>
    </div>
  )
}

export default SendEmail
