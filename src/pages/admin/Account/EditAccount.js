/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Summary from '../../../API'
import { Button, Card, Form, Image, Input, Radio, Select, Spin } from 'antd'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'


const EditAccount = () => {
  const navigate = useNavigate()
  // get roles
  const [roles, setRoles] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.getRoles.url, { withCredentials: true })
    if (response.data.success === true) {
      setRoles(response.data.roles)
    }
  }
  // get data account by id
  const params = useParams();
  const [data, setData] = useState({})
  const fetchApiAccount = async () => {
    const response = await axios.get(Summary.getAccountById.url + params.id, { withCredentials: true })
    if (response.data.success === true) {
      setData(response.data.account)
    }
  }
  useEffect(() => {
    fetchApi()
    fetchApiAccount()
  }, [])
  console.log(data);


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
      data.avatar = previewImage
      setLoading(true)
      const response = await axios.post(Summary.editAccount.url + params.id, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message)
        setLoading(false)
        navigate('/admin/accounts')
      } else {
        toast.error(response.data.message)
        setLoading(false)
        navigate('/admin/accounts')
      }
    }
  }
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role_id: data.role_id?._id,
        status: data.status === 'active' ? 'active' : 'inactive',
      });
      setPreviewImage(data.avatar);
    }
  }, [data, form]);
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
              message: 'Vui lòng nhập họ và tên!',
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
          <Input.Password visibilityToggle={false} />
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
            {loading ? <Spin size="small" /> : 'Cập nhật'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditAccount
