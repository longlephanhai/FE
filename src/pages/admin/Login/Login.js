/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
// import './Login.scss'
import axios from 'axios';
import Summary from '../../../API'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';

const Login = () => {
  const navigate = useNavigate();

  const checkToken = async () => {
    const fetchApi = await axios.get(Summary.checkToken.url, { withCredentials: true })
    if (fetchApi.data.success === true) {
      navigate('/admin')
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  const handleSubmit = async (values) => {
    const fetchApi = await axios.post(Summary.signUp.url, values, { withCredentials: true });
    if (fetchApi.data.success === true) {
      toast.success("Đăng nhập thành công");
      navigate('/admin');
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <Card
      style={{
        maxWidth: '500px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <ToastContainer position='top-center' />
      <Form
        name="login_form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }} // Nút đăng nhập rộng đầy form
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login
