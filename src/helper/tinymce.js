import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
const Tinymce = () => {
  return (
    <Editor
      apiKey='f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts'
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue="Mô tả"
    />
  )
}

export default Tinymce
