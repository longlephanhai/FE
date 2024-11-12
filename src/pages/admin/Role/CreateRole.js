import React from 'react'
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import Summary from '../../../API';
import './CreateRole.scss'
import { toast } from 'react-toastify';
const CreateRole = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (data) => {
    const fetchApi = await axios.post(Summary.createRole.url, data, { withCredentials: true })
    if (fetchApi.data.success) {
      toast.success(fetchApi.data.message)
      form.resetFields()
    }
  }
  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1>Tạo nhóm quyền</h1>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Tên nhóm quyền"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên nhóm quyền!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Miêu tả ngắn"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập miêu tả ngắn!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col >
            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CreateRole
