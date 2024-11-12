/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Summary from '../../../API'
import './Detail.scss'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { count } from '../../../actions/client'
const Detail = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const fetchApi = async () => {
    const response = await axios.get(Summary.detailProductClient.url + params.slug)
    if (response.data.success) {
      setData(response.data.product)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const dispatch = useDispatch()
  const handleAddCart = async (id) => {
    const response = await axios.post(Summary.addCart.url, { id }, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
      dispatch(count(1))

    } else {
      toast.error(response.data.message)
    }
  }
  const navigate = useNavigate()
  const handleBuyNow = async (id) => {
    const response = await axios.post(Summary.addCart.url, { id }, { withCredentials: true })
    if (response.data.success) {
      dispatch(count(1))
      navigate('/cart')
    } else {
      navigate('/cart')
    }
  }
  return (
    <div className="book-detail">
      <div className="book-detail__container">
        {/* Hình ảnh sách */}
        <div className="book-detail__image-section">
          <img src={data.thumbnail} alt={data.title} className="book-detail__image" />
        </div>

        {/* Thông tin sách */}
        <div className="book-detail__info">
          <h1 className='book-detail__category'>Danh mục: {data?.product_category_id?.title}</h1>
          <h1 className="book-detail__title">{data.title}</h1>
          <p className="book-detail__stock">Số lượng: {data.stock}</p>

          {/* Giá và giảm giá */}
          <div className="book-detail__pricing">
            <span className="book-detail__discount">Giảm giá: {data.discountPercentage}%</span>
            <span className="book-detail__price-old">Giá gốc: {data.price} VND</span>
            <span className="book-detail__price-new">{data.priceNew} VND</span>

          </div>

          {/* Thêm vào giỏ hàng và mua ngay */}
          <div className="book-detail__actions">
            <button className="book-detail__add-to-cart" onClick={() => handleAddCart(data._id)}>Thêm vào giỏ hàng</button>
            <button className="book-detail__buy-now" onClick={() => handleBuyNow(data._id)}>Mua ngay</button>
          </div>
        </div>
      </div>

      {/* Phần mô tả */}
      <h2 className="book-detail__description-title">Mô tả sách</h2>
      <div className="book-detail__description" dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>

  )
}

export default Detail
