import React from 'react'
import './Success.scss'
import { useNavigate } from 'react-router-dom';
const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="success-page">
      <div className="success-page__container">
        <div className="success-page__icon">
          <div className="success-page__tick"></div>
        </div>
        <h1 className="success-page__title">Thanh toán thành công</h1>
        <p className="success-page__message">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được đặt thành công.
        </p>
        <button className="success-page__button" onClick={() => navigate('/order')}>
          Xem chi tiết đơn hàng
        </button>
      </div>
    </div>
  )
}

export default Success
