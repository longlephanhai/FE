import React, { useEffect, useState } from 'react';
import './ProductCategory.scss';
import TableTree from '../../../helper/table-tree';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Summary from '../../../API';
import { Button, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const ProductCategory = () => {
  const [records, setRecords] = useState([]);

  const getProductCategory = async () => {
    const fetchApi = await axios.get(Summary.getProductCategory.url, { withCredentials: true });
    setRecords(fetchApi.data.records);
  };

  useEffect(() => {
    getProductCategory();
  }, []);
  const role = useSelector(state => state.roleReducer)
  return (
    <div className="product-category">
      <Title level={1} className="product-category__title">Trang danh mục sản phẩm</Title>
      <div className="product-category__header">
        <p className="product-category__list-text">Danh sách</p>
        {
          role?.permissions?.includes('products-category_create') &&
          <Link to="create">
            <Button type="primary" className="product-category__add-link">+ Thêm mới</Button>
          </Link>
        }

      </div>
      <TableTree role={role} items={records} getProductCategory={getProductCategory} />
    </div>
  );
};

export default ProductCategory;
