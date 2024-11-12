/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Summary from '../../../API';
import {  Button, Card, Image, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const AccountDetail = () => {
  const role = useSelector(state => state.roleReducer)
  const { Title, Text } = Typography;
  const params = useParams();
  const [data, setData] = useState({})
  const fetchApi = async () => {
    const response = await axios.get(Summary.getAccountById.url + params.id, { withCredentials: true })
    if (response.data.success === true) {
      setData(response.data.account)
    }
  }
  console.log(data);

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <Card
      style={{ width: '100%', maxWidth: '600', margin: '0 auto', height: '100%' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      title="Chi tiết tài khoản"
    >
      <Image
        src={data.avatar}
        width={120}
        icon={!data.avatar && <UserOutlined />}
        alt={data.fullName}
        style={{ marginBottom: '20px', borderRadius: '50%' }}
      />
      <Title level={3} style={{ margin: '5px 0' }}>
        {data.fullName}
      </Title>
      <Text style={{ fontSize: '16px' }}>Email: {data.email}</Text>
      <br />
      <Text style={{ fontSize: '16px' }}>Số điện thoại: {data.phone}</Text>
      <br />
      <Text style={{ fontSize: '16px' }}>Vai trò: {data.role_id?.title}</Text>
      <br />
      <div style={{ fontSize: '16px' }}>
        Trạng thái:
        {data.status === 'active' ? (
          <Tag color="green" style={{ marginLeft: '5px' }}>
            Hoạt động
          </Tag>
        ) : (
          <Tag color="red" style={{ marginLeft: '5px', color: 'inherit' }}>
            Dừng hoạt động
          </Tag>
        )}
      </div>
      <br />
      {
        role?.permissions?.includes('accounts_update') &&
        <Button type="primary" size="large" style={{ marginTop: '15px', padding: '0 30px' }}> {/* Tăng size button */}
          <Link to={`/admin/accounts/edit/${data._id}`} style={{ fontSize: '16px' }}>Cập nhật</Link> {/* Tăng fontSize link */}
        </Button>
      }

    </Card>
  )
}

export default AccountDetail
