/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './DetailProduct.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
const DetailProduct = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const productDetail = async () => {
    const fetchApi = await axios.get(Summary.detailProduct.url + params.id, { withCredentials: true })
    setData(fetchApi.data.product)
  }
  useEffect(() => {
    productDetail()
  }, [])
  console.log(data);

  return (
    <div className="product-detail">
      {
        data && (
          <div className="product-detail__item">
            <p className="product-detail__title">Tiêu đề: {data.title}</p>
            <p className="product-detail__price">Giá: {data.price}</p>
            <p className="product-detail__discount">Phần trăm giảm giá: {data.discountPercentage}</p>
            <p className="product-detail__stock">Số lượng: {data.stock}</p>
            <p className="product-detail__status">
              Trạng thái: {data.status === "active" ? "Hoạt động" : "Không hoạt động"}
            </p>
            <div>Ảnh: </div>
            <img className="product-detail__thumbnail" src={data.thumbnail} alt={data.title} />
            <div>Mô tả: </div>
            <div className="product-detail__description" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        )
      }
    </div>

  )
}

export default DetailProduct
