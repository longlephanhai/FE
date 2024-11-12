import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, Form, Image, Input, Radio, Select, Spin } from 'antd'
import axios from 'axios';
import Summary from '../../../API';
const CreateAccount = () => {
  const [roles, setRoles] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.getRoles.url, { withCredentials: true })
    if (response.data.success === true) {
      setRoles(response.data.roles)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const { Option } = Select;
  const [form] = Form.useForm()
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  const [avatar, setAvatar] = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file)
    }
  };
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data) => {
    if (data.password.length < 8) {
      toast.error("Mật khẩu phải lớn hơn 8 ký tự")
    } else {
      setLoading(true)
      data.avatar = avatar
      const response = await axios.post(Summary.createAccount.url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message)
        form.resetFields()
        setPreviewImage('')
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setLoading(false)
      } else {
        toast.error(response.data.message)
        setLoading(false)
      }
    }
  }
  return (
    <Card title="Tạo tài khoản" bordered={false} style={{ marginTop: 8 }}>
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 500,
          maxHeight: "100vh"
        }}
        initialValues={{
          status: "inactive"
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đúng định dạng Email!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar"
        >
          <Input ref={fileInputRef} type="file" name="avatar" id="avatar" accept="image/*" onChange={handleImageChange} />
          <Image src={previewImage} alt='' className='product__image' />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="Phân quyền"
          hasFeedback
        >
          <Select placeholder="-- Chọn --">
            {roles.map(role => (
              <Option key={role._id} value={role._id}>{role.title}</Option>
            ))}
            {/* <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option> */}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Trạng thái">
          <Radio.Group>
            <Radio value="active">Hoạt động</Radio>
            <Radio value="inactive">Không hoạt động</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? <Spin size="small" /> : 'Tạo tài khoản'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateAccount
