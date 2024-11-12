/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Summary from '../API';
import { toast } from 'react-toastify';
import { Table, Button, Tag } from 'antd';

const TableTree = ({ role, items, level = 1, getProductCategory }) => {
  const handleDelete = async (id) => {
    try {
      const fetchApi = await axios.post(Summary.deleteProductCategory.url, { id }, { withCredentials: true });
      if (fetchApi.data.success) {
        toast.success(fetchApi.data.message);
        getProductCategory();
      }
    } catch (error) {
      toast.error('Failed to delete the category.');
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text) => <img src={text} alt="Thumbnail" width={100} className="product-category-tree__thumbnail" />,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        const prefix = Array(level + 1).join("-- ");
        return (
          <span>
            {prefix}
            {text}
          </span>
        );
      },
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      render: (text) => <input type="number" value={text} className="product-category-tree__position" min="1" readOnly />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color={text === "active" ? "green" : "red"}>
          {text === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`detail/${record.slug}`}>
            <Button type="default" className="product-category-tree__button--detail">
              Chi tiết
            </Button>
          </Link>
          {
            role?.permissions?.includes('products-category_edit') &&
            <Link to={`/admin/products-category/edit/${record.slug}`}>
              <Button type="primary" className="product-category-tree__button--edit">
                Sửa
              </Button>
            </Link>
          }
          {
            role?.permissions?.includes('products-category_delete') &&
            <Button
              type="primary"
              danger
              className="product-category-tree__button--delete"
              onClick={() => handleDelete(record._id)}
            >
              Xóa
            </Button>
          }

        </span>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={items.map((item, index) => ({
        ...item,
        index: index + 1, // Adding index for display
      }))}
      rowKey="_id"
    />
  );
};

export default TableTree;
