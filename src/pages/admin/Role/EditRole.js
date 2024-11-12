import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'
import Summary from '../../../API';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditRole = () => {
  const params = useParams()
  const [form] = Form.useForm();
  const handleSubmit = async (data) => {
    const response = await axios.post(Summary.editRole.url + params.id, data, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
      form.resetFields()
    }
  }
  return (
    <Card title="Chỉnh sửa nhóm quyền" bordered={false} style={{ width: '100%' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: '',
          description: ''
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Tên nhóm quyền"
              name="title"
              rules={[{ required: true, message: 'Vui lòng nhập tên nhóm quyền!' }]}
            >
              <Input placeholder="Nhập tên nhóm quyền" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
              <Input placeholder="Nhập mô tả" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditRole
