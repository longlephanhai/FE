/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailOrder.scss'
const DetailOrder = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const fetchApi = async () => {
    const response = await axios.get(Summary.getOrderById.url + params.id, { withCredentials: true })
    if (response.data.success) {
      setData(response.data.order)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const navigate = useNavigate()
  return (
    <div className="order-products">
      {
        data.products && data.products.map((item, index) => (
          <div className="order-products__item" key={index}>
            <img className="order-products__item-thumbnail" src={item.product_id.thumbnail} alt={item.product_id.title} />
            <div className="order-products__item-info">
              <p className="order-products__item-title">{item.product_id.title} x {item.quantity}</p>
              <p className="order-products__item-price">{item.product_id.price}.000vnđ</p>
            </div>
            <div className="order-products__item-total">
              <p>Tổng tiền: {item.product_id.price * item.quantity}.000vnđ</p>
            </div>
            <div className="order-products__item-buy-again">
              <button className="order-products__item-buy-again-btn" onClick={() => navigate(`/products/detail/${item.product_id.slug}`)}>Mua lại</button>
            </div>
          </div>
        ))
      }
    </div>


  )
}

export default DetailOrder
