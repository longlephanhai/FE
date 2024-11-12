import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import Summary from '../../../API'
import { Button, Table, Typography } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const Role = () => {
  const role = useSelector(state => state.roleReducer)
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const response = await axios.post(Summary.deleteRole.url, { id }, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
      fetchApi()
    }
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Nhóm quyền',
      dataIndex: 'title',
      key: 'title',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Mô tả ngắn',
      dataIndex: 'description',
      key: 'description',
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => navigate(`detail/${record._id}`)}>Chi tiết</Button>
          {
            role?.permissions?.includes('roles_edit') &&
            <Button type="link" onClick={() => navigate(`edit/${record._id}`)}>Sửa</Button>
          }
          {
            role?.permissions?.includes('roles_delete') &&
            <Button type="link" danger onClick={() => handleDelete(record._id)}>Xóa</Button>
          }
        </div>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
  ];
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.getRoles.url, { withCredentials: true })
    if (response.data.success) {
      setData(response.data.roles)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const { Title } = Typography;

  return (
    <div style={{ with: '100%', margin: 'auto' }}>
      <Title level={1}>Nhóm quyền</Title>
      {
        role.permissions.includes('roles_create') &&
        <div style={{ marginBottom: 16 }}>
          <Link to="create">
            <Button type="primary">+ Thêm mới</Button>
          </Link>
        </div>
      }
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id} // Đảm bảo mỗi hàng có một khóa duy nhất
        pagination={{ pageSize: 10 }} // Phân trang 10 hàng mỗi trang
        scroll={{ x: '100%' }} // Đảm bảo bảng có thể cuộn ngang
      />
    </div>
  )
}

export default Role
