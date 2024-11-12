import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Summary from '../../../API'
import { FaBox } from 'react-icons/fa'
import moment from 'moment'
import { toast } from 'react-toastify'
import './OrderAdmin.scss'
const OrderAdmin = () => {
  const [data, setData] = useState([])
  const fetchAPi = async () => {
    const response = await axios.get(Summary.getOrders.url, { withCredentials: true })
    setData(response.data.orders)
  }
  useEffect(() => {
    fetchAPi()
  }, [])

  const onChangeStatus = async (e, id) => {
    const response = await axios.post(Summary.changeStatusOrder.url, { status: e.target.value, id: id }, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
      fetchAPi()
    } else {
      toast.error("Câp nhật trạng thái đơn hàng thất bại")
    }
  }
  return (
    <div className="order-admin">
      <div className="order-admin__list">
        {
          data?.map((item, index) => (
            <div key={index} className="order-admin__item">
              <div className="order-admin__icon">
                <FaBox />
              </div>
              <div className="order-admin__products">
                {
                  item.products.map((product, productIndex) => (
                    <div key={productIndex} className="order-admin__products-product">
                      <img width={100} height={"auto"} className="order-admin__products-product-image" src={product.product_id.thumbnail} alt={product.product_id.title} />
                      <p className="order-admin__products-product-title">
                        {product.product_id.title} <span className="order-admin__products-product-quantity">x {product.quantity}</span>
                      </p>
                    </div>
                  ))
                }
              </div>
              <div className="order-admin__details">
                <div className="order-admin__info">
                  <p className="order-admin__date">Ngày đặt hàng: {moment(item.createdAt).format('DD/MM/YYYY, h:mm:ss a')}</p>
                  <p className="order-admin__user">Người đặt hàng: {item.userInfo.fullName}</p>
                  <p className="order-admin__address">Địa chỉ: {item.userInfo.address}</p>
                </div>
                <div className="order-admin__status">
                  <label htmlFor="status-select">Trạng thái:</label>
                  <select id="status-select" onChange={(e) => onChangeStatus(e, item._id)} value={item.status}>
                    <option value="wait">Chờ xác nhận</option>
                    <option value="delivering">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default OrderAdmin
