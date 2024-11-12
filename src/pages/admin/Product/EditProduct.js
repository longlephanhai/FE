/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'
import SelectTree from '../../../helper/select-tree'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
import { Spin } from 'antd'
import { toast } from 'react-toastify'

const EditProduct = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const productDetail = async () => {
    const fetchApi = await axios.get(Summary.detailProduct.url + params.id, { withCredentials: true })
    setData(fetchApi.data.product)
  }
  useEffect(() => {
    productDetail()
  }, [])

  const [records, setRecords] = useState([])
  const getProductCategory = async () => {
    const fetchApi = await axios.get(Summary.getProductCategory.url, { withCredentials: true })
    setRecords(fetchApi.data.records)
  }
  useEffect(() => {
    getProductCategory()
  }, [])
  const [previewImage, setPreviewImage] = useState('');
  useEffect(() => {
    setPreviewImage(data.thumbnail)
  }, [data.thumbnail])
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      setData((prevState) => ({
        ...prevState,
        thumbnail: file
      }));
    }
  };
  const handleEditorChange = (content) => {
    setData((prevState) => ({
      ...prevState,
      description: content
    }));
  };
  const fileInputRef = useRef(null);
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setData((prevState) => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fetchApi = await axios.post(Summary.editProduct.url + data.slug, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(fetchApi.data.message);
    if (fetchApi.data.success) {
      toast.success(fetchApi.data.message)
      setLoading(false)
    } else {
      toast.error(fetchApi.data.message)
      setLoading(false)
    }

  }
  return (
    <div className='product'>
      <h1 className='product__title'>Thêm mới sản phẩm</h1>
      <form onSubmit={handleSubmit}
        className='product__form'>
        <div className='product__form-group'>
          <label htmlFor="title" className='product__label'>Tên sản phẩm</label>
          <input
            onChange={handleOnChange}
            value={data.title}
            type="text"
            d="title"
            name="title"
            required
            className='product__input' />
        </div>
        <div className='product__form-group'>
          <label htmlFor="product_category_id" className='product__label'>Danh mục cha</label>
          <select
            onChange={handleOnChange}
            id="product_category_id"
            value={data.product_category_id}
            name="product_category_id" className='product__select'>
            <option value="0">-- Chọn danh mục cha --</option>
            <SelectTree items={records} />
          </select>
        </div>

        <div className='product__form-group'>
          <div className='product__radio-group'>
            <input
              onChange={handleOnChange}
              type='radio'
              name='featured'
              id='featured1'
              value="1"
              checked={data.featured === "1"}
              className='product__radio'
            />
            <label htmlFor='featured1' className='product__label'>Nổi bật</label>
            <input
              onChange={handleOnChange}
              type='radio'
              name='featured'
              id='featured0'
              value="0"
              className='product__radio'
              checked={data.featured === "0"}
            />
            <label htmlFor='featured0' className='product__label'>Không nổi bật</label>
          </div>
        </div>

        <div className='product__form-group'>
          <label htmlFor='description' className='product__label'>Mô tả</label>
          {/* <textarea name="description" id="description" cols="30" rows="5" className='product__textarea'></textarea> */}
          <Editor
            apiKey='f634hmvv952dqddt0l2tijyvirdbtsede90ds9pl2yrefcts'
            name="description" id="description"
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            value={data.description}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className='product__form-group'>
          <label htmlFor="price" className='product__label'>Giá</label>
          <input
            onChange={handleOnChange}
            type="number" id="price" name="price" min={0}
            value={data.price}
            className='product__input' />
        </div>

        <div className='product__form-group'>
          <label htmlFor="discount" className='product__label'>% Giảm giá</label>
          <input
            onChange={handleOnChange}
            type="number" id="discount" name="discountPercentage" min={0}
            value={data.discountPercentage}
            className='product__input' />
        </div>

        <div className='product__form-group'>
          <label htmlFor="stock" className='product__label'>Số lượng</label>
          <input
            onChange={handleOnChange}
            type="number" id="stock" name="stock" min={0}
            value={data.stock}
            className='product__input' />
        </div>

        <div className='product__form-group'>
          <label htmlFor="thumbnail" className='product__label'>Ảnh</label>
          <input
            ref={fileInputRef}
            type="file" name="thumbnail" id="thumbnail" accept="image/*" className='product__file-input'
            onChange={handleImageChange}
          />
          <img
            src={previewImage}
            alt='' className='product__image' />
        </div>

        <div className='product__form-group'>
          <label htmlFor="position" className='product__label'>Vị trí</label>
          <input
            onChange={handleOnChange}
            type="number" id="position" name="position"
            value={data.position}
            min={1} placeholder='Tự động tăng' className='product__input' />
        </div>

        <div className='product__form-group'>
          <input
            onChange={handleOnChange}
            type='radio'
            name='status'
            id='statusActive'
            value="active"
            className='product__radio'
            checked={data.status === "active"}
          />
          <label htmlFor='statusActive' className='product__label'>Hoạt động</label>
          <input
            onChange={handleOnChange}
            type='radio'
            name='status'
            id='statusInActive'
            value="inactive"
            className='product__radio'
            checked={data.status === "inactive"}
          />
          <label htmlFor='statusInActive' className='product__label'>Dừng hoạt động</label>
        </div>

        <div className="product__form-group">
          <button type='submit' className='product__submit-button'
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : 'Cập nhật'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
