import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import { Avatar, Button, Card, Table, Tag } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Account = () => {
  const role = useSelector(state => state.roleReducer)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.getAccounts.url, { withCredentials: true })
    if (response.data.success === true) {
      setData(response.data.accounts)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const handleDelete = async (id) => {
    const response = await axios.post(Summary.deleteAccount.url, { id }, { withCredentials: true })
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
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar src={avatar} size={100} />,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (role) => role.title,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'active') {
          color = 'green';
        } else if (status === 'inactive') {
          color = 'red';
        }
        return <Tag color={color}>{status === "active" ? "Hoạt động" : "Dừng hoạt động"}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => navigate(`detail/${record._id}`)}>Chi tiết</Button>
          {
            role.permissions.includes('accounts_edit') &&
            <Button type="default" style={{ marginRight: 8 }} onClick={() => navigate(`edit/${record._id}`)}>Sửa</Button>
          }
          {
            role.permissions.includes('accounts_delete') &&
            <Button type="primary" danger style={{ marginRight: 8 }} onClick={() => handleDelete(record._id)}>Xóa</Button>
          }
        </div>
      ),
    },
  ];
  return (
    <Card title="Danh sách tài khoản" bordered={false} style={{ marginTop: 8 }}>
      <Link to={'create'}>
        {
          role?.permissions?.includes('accounts_create') &&
          <Button type="primary" ghost style={{ margin: 4 }}>
            Tạo tài khoản
          </Button>
        }
      </Link>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: true }}
      />
    </Card>
  )
}

export default Account
