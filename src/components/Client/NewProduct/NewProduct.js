import React, { useEffect, useState } from 'react'
import './NewProduct.scss'
import axios from 'axios'
import Summary from '../../../API'
import { Link } from 'react-router-dom'


const NewProduct = () => {
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.home.url)
    if (response.data.success) {
      setData(response.data.productNew)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <div className='new-product'>
      <h1 className="new-product__title">Sản phẩm mới</h1>
      {data.map((item, index) => (
        <Link to={`products/detail/${item.slug}`} className="new-product__item" key={index}>
          <img src={item.thumbnail} className="new-product__image" width={200} height={200} alt={item.title} />
          <div className="new-product__discount">{item.discountPercentage}%</div>
          <div className="new-product__price">{item.price} VND</div>
          <div className="new-product__price-new">{item.priceNew} VND</div>
        </Link>
      ))}
    </div>

  )
}

export default NewProduct
