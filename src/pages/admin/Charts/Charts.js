import React from 'react'
import { Col, Row } from 'antd'
import BasicArea from '../../../components/Admin/BasicArea/BasicArea'

const Charts = () => {
  return (
    <div className='p-1'>
      <Row gutter={[16, 16]}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BasicArea />
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          {/* <PieChartArea /> */}
        </Col>
      </Row>
    </div>
  )
}

export default Charts
