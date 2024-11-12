/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './DetailProductCategory.scss'
import axios from 'axios'
import Summary from '../../../API'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const DetailProductCategory = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const detailProductCategory = async () => {
    const fetchApi = await axios.get(Summary.getProductCategoryById.url + params.slug, { withCredentials: true })
    if (fetchApi.data.success === true) {
      setData(fetchApi.data.records)
    }
  }
  useEffect(() => {
    detailProductCategory()
  }, [])
  const role = useSelector(state => state.roleReducer)
  return (
    <div className='product-category-detail'>
      <h1 className='product-category-detail__title'>Trang chi tiết danh mục sản phẩm</h1>
      <div className='product-category-detail__content'>
        {data && (
          <div className='product-category-detail__info'>
            <p className='product-category-detail__info-title'>Tiêu đề: {data.title}</p>
            <p className='product-category-detail__info-parent'>Danh mục cha: {data.parent_id?.title}</p>
            <p className='product-category-detail__info-position'>Vị trí: {data.position}</p>
            <p className='product-category-detail__info-status'>Trạng thái: {data.status === "active" ? "Hoạt động" : "Không hoạt động"}</p>
            <div className='product-category-detail__info-description' dangerouslySetInnerHTML={{ __html: data.description }} />
            <img className='product-category-detail__info-thumbnail' src={data.thumbnail} alt='' />
            {
              role?.permissions?.includes('products-category_create') &&
              <Link to={`/admin/products-category/edit/${data.slug}`} className='product-category-detail__edit-button'>Chỉnh sửa</Link>
            }

          </div>
        )}
      </div>
    </div>

  )
}

export default DetailProductCategory
