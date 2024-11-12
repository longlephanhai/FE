import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Card, Col, Row } from 'antd'
import Summary from '../../../API'

const Dashboard = () => {
  const user = useSelector(state => state?.loginReducer)
  const role = useSelector(state => state?.roleReducer)

  const [statics, setStatics] = useState([])
  const fetchApi = async () => {
    const fetchApi = await axios?.get(Summary?.getStatic?.url, { withCredentials: true })
    if (fetchApi?.data?.success === true) {
      setStatics(fetchApi?.data?.static)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <Row gutter={16} className="mt-4">
      <Col xs={24} md={24} xxl={24} xl={24}>
        <Card title="Thông tin tài khoản" className="mb-4">
          {user?.avatar && (
            <Avatar
              src={user?.avatar}
              style={{ height: 100, width: 100, borderRadius: '50%' }}
            />
          )}
          {user?.fullName && (
            <p>
              Họ tên: <b>{user?.fullName}</b>
            </p>
          )}
          {user?.email && (
            <p>
              Email: <b>{user?.email}</b>
            </p>
          )}
          {user?.phone && (
            <p>
              Số điện thoại: <b>{user?.phone}</b>
            </p>
          )}
          {role?.title && (
            <p>
              Phân quyền: <b>{role?.title}</b>
            </p>
          )}
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Danh mục sản phẩm" className="mb-4" style={{ width: '100%', minHeight: 210 }}>
          <p>
            Số lượng: <b>{statics?.categoryProduct?.total}</b>
          </p>
          <p>
            Hoạt động: <b>{statics?.categoryProduct?.active}</b>
          </p>
          <p>
            Dừng hoạt động: <b>{statics?.categoryProduct?.inactive}</b>
          </p>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Sản phẩm" className="mb-4"  style={{ width: '100%', minHeight: 210 }} >
          <p>
            Số lượng: <b>{statics?.products?.total}</b>
          </p>
          <p>
            Hoạt động: <b>{statics?.products?.active}</b>
          </p>
          <p>
            Dừng hoạt động: <b>{statics?.products?.inactive}</b>
          </p>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Tài khoản admin" className="mb-4"  style={{ width: '100%', minHeight: 210 }}>
          <p>
            Số lượng: <b>{statics?.account?.total}</b>
          </p>
          <p>
            Hoạt động: <b>{statics?.account?.active}</b>
          </p>
          <p>
            Dừng hoạt động: <b>{statics?.account?.inactive}</b>
          </p>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Tài khoản client" className="mb-4"  style={{ width: '100%', minHeight: 210 }}>
          <p>
            Số lượng: <b>{statics?.user?.total}</b>
          </p>
          <p>
            Hoạt động: <b>{statics?.user?.active}</b>
          </p>
          <p>
            Dừng hoạt động: <b>{statics?.user?.inactive}</b>
          </p>
        </Card>
      </Col>
    </Row>

  )
}

export default Dashboard
