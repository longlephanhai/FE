/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Summary from '../../../API'
import './CategoryProduct.scss'
const CategoryProduct = () => {
  const slug = useParams()
  const [products, setProducts] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.categorySlug.url + slug.slug)
    if (response.data.success) {
      setProducts(response.data.products)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div className="product-list">
      {products.map((product) => (
        <Link to={`/products/detail/${product.slug}`} className="product-list__item" key={product._id}>
          <img
            className="product-list__item-thumbnail"
            src={product.thumbnail}
            alt={product.title}
          />
          <div className="product-list__item-info">
            <h3 className="product-list__item-title">{product.title}</h3>
            <p className="product-list__item-price">
              {product.priceNew}.000 VNĐ
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryProduct
