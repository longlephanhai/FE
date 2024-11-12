import React from 'react'
import './Banner.scss'
const Banner = ({banner}) => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner" className="banner__image" />
      <div className="banner__content">
        <h1 className="banner__title">Chào mừng đến với Thế giới Sách</h1>
        <p className="banner__description">
          Khám phá bộ sưu tập sách phong phú và tìm cuốn sách yêu thích của bạn ngay hôm nay!
        </p>
        <button className="banner__button">Khám Phá Ngay</button>
      </div>
    </div>
  )
}

export default Banner
