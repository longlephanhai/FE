import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Summary from '../../../API'
import { FaBox } from "react-icons/fa";
import './Order.scss'
import { useNavigate } from 'react-router-dom';
const Order = () => {
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.getOrder.url, { withCredentials: true })
    setData(response.data.orders)
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const navigate = useNavigate()
  const handleOnClick = async (id) => {
    navigate(`/order/${id}`)
  }
  return (
    <div className='order-list'>
      {
        data.map((item, index) => (
          <div className='order-list__item' key={index}>
            <div className='order-list__icon'>
              <FaBox />
            </div>
            <div className='order-list__products'>
              {
                item.products.map((product, index) => (
                  <div className='order-list__product' key={index}>
                    <img className='order-list__product-thumbnail' src={product.product_id.thumbnail} alt={product.product_id.title} />
                    <p className='order-list__product-info'>
                      {product.product_id.title} <span>x {product.quantity}</span>
                    </p>
                  </div>
                ))
              }
            </div>
            <div className='order-list__details' onClick={() => handleOnClick(item._id)}>Chi tiết đơn hàng</div>
          </div>
        ))
      }
    </div>
  )
}

export default Order
