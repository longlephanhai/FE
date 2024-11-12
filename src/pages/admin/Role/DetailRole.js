/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import { useParams } from 'react-router-dom'
import { Card, Col, Row } from 'antd'

const DetailRole = () => {
  const params = useParams()
  const [data, setData] = useState({})
  const fetchApi = async () => {
    const response = await axios.get(Summary.getRoleById.url + params.id, { withCredentials: true })
    if (response.data.success) {
      setData(response.data.role)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <div style={{ width: '100%', height: '100vh', padding: '16px' }}>
      {data && (
        <Card title="Chi tiết nhóm quyền" bordered={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <p><strong>Tên nhóm quyền:</strong> {data.title}</p>
            </Col>
            <Col xs={24} sm={12}>
              <p><strong>Mô tả:</strong> {data.description}</p>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default DetailRole
