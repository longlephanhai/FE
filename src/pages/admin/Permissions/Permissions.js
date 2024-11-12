/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Summary from '../../../API'
import './Permissions.scss'
import { Form, Button, Table, Checkbox, Card, Row, Col, Spin } from 'antd';
import { toast } from 'react-toastify'

const Permissions = () => {
  const [data, setData] = useState([])
  const [permissions, setPermissions] = useState({});
  const fetchApi = async () => {
    const response = await axios.get(Summary.getPermissions.url, { withCredentials: true })
    if (response.data.success) {
      setData(response.data.roles)
      const initialPermissions = {}; // Khởi tạo permissions ban đầu
      response.data.roles.forEach((role) => {
        initialPermissions[role.title] = {};
        role.permissions.forEach((permission) => {
          initialPermissions[role.title][permission] = true;
        });
      });
      setPermissions(initialPermissions);
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  console.log(permissions);

  const columns = [
    {
      title: 'Tính năng',
      dataIndex: 'feature',
      key: 'feature',
    },
    ...data.map((item) => ({
      title: item.title,
      key: item._id,
      permissions: item.permissions,
      render: (_, record) => {
        if (record.feature.type === 'b') {
          return null;
        }
        return (
          <Form.Item>
            <Checkbox
              onChange={(e) => handleCheckboxChange(e.target.checked, item.title, record.name)}
              checked={permissions[item.title] ? permissions[item.title][record.name] : false}
            />

          </Form.Item>
        )
      },
    })),
  ];
  const handleCheckboxChange = (checked, roleName, permissionName) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [roleName]: {
        ...prevPermissions[roleName],
        [permissionName]: checked,

      },
    }));
  };

  const permissionsData = [
    {
      key: '1', feature: <b>Danh mục sản phẩm</b>
    },
    {
      key: '2',
      name: 'products-category_view',
      feature: 'Xem danh mục sản phẩm',
    },
    {
      key: '3',
      name: 'products-category_create',
      feature: 'Thêm mới danh mục sản phẩm',
    },
    {
      key: '4',
      name: 'products-category_edit',
      feature: 'Chỉnh sửa danh mục sản phẩm',
    },
    {
      key: '5',
      name: 'products-category_delete',
      feature: 'Xóa danh mục sản phẩm',
    },
    {
      key: '6', feature: <b>Sản phẩm</b>
    },
    {
      key: '7',
      name: 'products_view',
      feature: 'Xem sản phẩm',
    },
    {
      key: '8',
      name: 'products_create',
      feature: 'Thêm mới sản phẩm',
    },
    {
      key: '9',
      name: 'products_edit',
      feature: 'Chỉnh sửa sản phẩm',
    },
    {
      key: '10',
      name: 'products_delete',
      feature: 'Xóa sản phẩm',
    },
    {
      key: '11', feature: <b>Nhóm quyền</b>
    },
    {
      key: '12',
      name: 'roles_view',
      feature: 'Xem nhóm quyền',
    },
    {
      key: '13',
      name: 'roles_create',
      feature: 'Thêm mới nhóm quyền',
    },
    {
      key: '14',
      name: 'roles_edit',
      feature: 'Chỉnh sửa nhóm quyền',
    },
    {
      key: '15',
      name: 'roles_delete',
      feature: 'Xóa nhóm quyền',
    },
    {
      key: '16',
      name: 'roles_permissions',
      feature: 'Phân quyền nhóm quyền',
    },
    {
      key: '17', feature: <b>Danh sách tài khoản</b>
    },
    {
      key: '18',
      name: 'accounts_view',
      feature: 'Xem danh sách tài khoản',
    },
    {
      key: '19',
      name: 'accounts_create',
      feature: 'Thêm mới tài khoản',
    },
    {
      key: '20',
      name: 'accounts_edit',
      feature: 'Chỉnh sửa tài khoản',
    },
    {
      key: '21',
      name: 'accounts_delete',
      feature: 'Xóa tài khoản',
    },
    {
      key: '22', feature: <b>Cài đặt chung</b>
    },
    {
      key: '23',
      name: 'setting_view',
      feature: 'Xem cài đặt chung',
    },
    {
      key: '24',
      name: 'setting_edit',
      feature: 'Chỉnh sửa cài đặt chung',
    },
  ];




  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    const response = await axios.post(Summary.editPermissions.url, permissions, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
      setLoading(false)
    } else {
      toast.error(response.data.message)
      setLoading(false)
    }
  }

  return (
    <Card title="Phân quyền">
      <Form
        form={form}
        className="permissions-form"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Button
              type="primary"
              disabled={loading}
              htmlType="submit"
              className="permissions-form__submit"
              loading={loading}
              block
            >
              {loading ? <Spin size="small" /> : 'Cập nhật'}
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="table-container">
              <Table
                columns={columns}
                dataSource={permissionsData}
                pagination={false}
                bordered
                className="permissions-form__table"
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Card>

  )
}

export default Permissions
