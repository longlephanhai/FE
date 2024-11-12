/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import './EditProductCategory.scss'
import axios from 'axios';
import Summary from '../../../API';
import { toast } from 'react-toastify';
import SelectTree from '../../../helper/select-tree';
import { Editor } from '@tinymce/tinymce-react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';

const EditProductCategory = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const detailProductCategory = async () => {
    const fetchApi = await axios.get(Summary.getProductCategoryById.url + params.slug, { withCredentials: true })
    if (fetchApi.data.success === true) {
      setData(fetchApi.data.records)
    }
  }
  useEffect(() => {
    detailProductCategory()
  }, [])
  console.log(data);


  const [previewImage, setPreviewImage] = useState('');
  useEffect(() => {
    setPreviewImage(data?.thumbnail)
  }, [data?.thumbnail])
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setData((prevState) => ({
        ...prevState,
        [name]: files[0]
      }));
    } else if (name === "status") {
      setData((prevState) => ({
        ...prevState,
        status: value
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Hàm xử lý chọn ảnh và tạo preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Cập nhật ảnh vào state để gửi lên server
      setData((prevState) => ({
        ...prevState,
        thumbnail: file
      }));
    }
  };
  // Hàm cập nhật mô tả từ TinyMCE
  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      description: content
    }));
  };
  // Hàm xử lý submit form
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const fetchApi = await axios.post(Summary.editProductCategory.url + params.slug, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    if (fetchApi.data.success) {
      toast.success(fetchApi.data.message)
      setLoading(false)
    }
  };
  const [records, setRecords] = useState([])
  const getProductCategory = async () => {
    const fetchApi = await axios.get(Summary.getProductCategory.url, { withCredentials: true })
    setRecords(fetchApi.data.records)
  }
  useEffect(() => {
    getProductCategory()
  }, [])
  return (
    <div className="product-category-edit">
      <h1 className="product-category-edit__title">Sửa danh mục sản phẩm</h1>
      <form onSubmit={handleSubmit} className="product-category-edit__form">

        <div className="product-category-edit__form-group">
          <label htmlFor="title" className="product-category-edit__label">Tên danh mục</label>
          <input value={data.title} onChange={handleOnChange} type="text" id="title" name="title" className="product-category-edit__input" required />
        </div>

        <div className="product-category-edit__form-group">
          <label htmlFor="parent_id" className="product-category-edit__label">Danh mục cha</label>
          <select onChange={handleOnChange} value={data.parent_id?._id} id="parent_id" name="parent_id" className="product-category-edit__select">
            <option value="0">-- Chọn danh mục cha --</option>
            <SelectTree items={records} />
          </select>
        </div>

        <div className="product-category-edit__form-group">
          <label htmlFor="description" className="product-category-edit__label">Mô tả</label>
          <Editor
            apiKey="f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts"
            name="description"
            id="description"
            init={{
              directionality: 'ltr',
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            initialValue={data.description}
            className="product-category-edit__editor"
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="product-category-edit__form-group product-category-edit__upload">
          <label htmlFor="thumbnail" className="product-category-edit__label">Ảnh</label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            className="product-category-edit__file-input"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {previewImage && (
            <img src={previewImage} width={200} alt="Preview" className="product-category-edit__image-preview" />
          )}
        </div>

        <div className="product-category-edit__form-group">
          <label htmlFor="position" className="product-category-edit__label">Vị trí</label>
          <input value={data.position} onChange={handleOnChange} type="number" id="position" name="position" min={1} placeholder='Tự động tăng' className="product-category-edit__input" />
        </div>

        <div className="product-category-edit__form-group product-category-edit__status">
          <input onChange={handleOnChange} type="radio" name="status" id="statusActive" value="active" className="product-category-edit__radio" checked={data.status === "active"} />
          <label htmlFor="statusActive" className="product-category-edit__label">Hoạt động</label>
          <input onChange={handleOnChange} type="radio" name="status" id="statusInActive" value="inactive" className="product-category-edit__radio" checked={data.status === "inactive"} />
          <label htmlFor="statusInActive" className="product-category-edit__label">Dừng hoạt động</label>
        </div>

        <div className="product-category-edit__form-group">
          <button type="submit" className="product-category-edit__submit-button" disabled={loading}>
            {loading ? <Spin size="small" /> : 'Cập nhật'}
          </button>
        </div>

      </form>
    </div>

  )
}

export default EditProductCategory
