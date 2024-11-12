import { Button, Card, Col, Form, Image, Input, Row, Spin } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Summary from '../../../API';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Setting = () => {
  const role = useSelector(state => state.roleReducer)
  const [data, setData] = useState({})
  const fetchApi = async () => {
    const fetchApi = await axios.get(Summary.general.url, { withCredentials: true })
    if (fetchApi.data.success === true) {
      setData(fetchApi.data.settingGeneral)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImageBanner, setPreviewImageBanner] = useState(null);
  const handleChangeBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImageBanner(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const [previewImagerLogo, setPreviewImageLogo] = useState(null);
  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImageLogo(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const handleSubmit = async (value) => {
    const image = [
      {
        logo: previewImagerLogo,
        banner: previewImageBanner
      }
    ]
    value.image = image
    console.log(value)
    setLoading(true)
    const fetchApi = await axios.post(Summary.updateSetting.url, value, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    if (fetchApi.data.success === true) {
      toast.success(fetchApi.data.message)
      setLoading(false)
    } else {
      toast.error(fetchApi.data.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue({
        websiteName: data.websiteName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        banner: data.banner,
        logo: data.logo,
        copyright: data.copyright
      });
      setPreviewImageLogo(data.logo);
      setPreviewImageBanner(data.banner);
    }
  }, [data, form]);
  return (
    <Row justify="center" align="middle" style={{ height: '100vh', padding: '5px' }}>
      <Col xs={24} sm={18} md={12} lg={8} xl={20}>
        <Card title="Cài đặt chung" className="settings-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item label="Tên website" name="websiteName">
              <Input />
            </Form.Item>

            <Form.Item label="Logo" name="logo">
              <Input type="file" accept='image/*' name="logo" onChange={handleChangeLogo} />
              <Image width={150} src={previewImagerLogo} alt="" />
            </Form.Item>

            <Form.Item label="Banner" name="banner">
              <Input type="file" accept='image/*' name="banner" onChange={handleChangeBanner} />
              <Image width={150} src={previewImageBanner} alt="" />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>

            <Form.Item label="Bản quyền" name="copyright">
              <Input />
            </Form.Item>
            {
              role?.permissions?.includes('setting_edit') &&
              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" disabled={loading}>
                  {loading ? <Spin size="small" /> : 'Cập nhật'}
                </Button>
              </Form.Item>
            }
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Setting
