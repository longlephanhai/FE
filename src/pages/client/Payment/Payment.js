import React, { useEffect, useState } from 'react'
import './Payment.scss'
import axios from 'axios';
import Summary from '../../../API';
const Payment = () => {
  // data cart
  const [cartItems, setCartItems] = useState([]);
  const fetchApi = async () => {
    const response = await axios.get(Summary.getCart.url, { withCredentials: true })
    if (response.data.success) {
      setCartItems(response.data.cart.products)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  console.log(cartItems);


  // data payment
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      userInfo: formData,
      products: cartItems
    }
    const response = await axios.post(Summary.placeOrder.url, orderData, { withCredentials: true })
    if (response.data.success) {
      console.log(response.data.session_url);
      window.location.href = response.data.session_url
    } else {
      console.log(response.data.message);
    }
  };
  return (
    <div className="checkout">
      <h2 className="checkout__title">Thông tin thanh toán</h2>
      <form className="checkout__form" onSubmit={handleSubmit}>
        <div className="checkout__form-group">
          <label className="checkout__label" htmlFor="fullName">Họ và tên:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="checkout__input"
            placeholder="Nhập họ và tên"
            required
          />
        </div>
        <div className="checkout__form-group">
          <label className="checkout__label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="checkout__input"
            placeholder="Nhập email"
            required
          />
        </div>
        <div className="checkout__form-group">
          <label className="checkout__label" htmlFor="phone">Số điện thoại:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="checkout__input"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        <div className="checkout__form-group">
          <label className="checkout__label" htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="checkout__input"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>
        <button type="submit" className="checkout__submit-btn">Xác nhận thanh toán</button>
      </form>
    </div>
  )
}

export default Payment
