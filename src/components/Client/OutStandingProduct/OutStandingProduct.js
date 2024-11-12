import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './OutStandingProduct.scss'
import { Link } from 'react-router-dom';
const OutStandingProduct = () => {
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.home.url)
    if (response.data.success) {
      setData(response.data.productSlider)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])


  return (
    <div>
      <h1>Sản phẩm nổi bật</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        style={{ height: '400px' }}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={`products/detail/${item.slug}`} className="slide">
              <img src={item.thumbnail} width={200} height={200} alt={item.title} />
              <div className="discount">{item.discountPercentage}%</div>
              <div className="price">{item.price} VND</div>
              <div className="priceNew">{item.priceNew} VND</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  )
}

export default OutStandingProduct
