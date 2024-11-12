/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react'
import { Button, Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaChartLine } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { GiTempleGate } from "react-icons/gi";
import axios from 'axios';
import Summary from '../../API';
import { useDispatch, useSelector } from 'react-redux';
import { getRole, getUser } from '../../actions/admin';
import { BiCategory } from "react-icons/bi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddCircle } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Login from '../../pages/admin/Login/Login';
import { IoSettings } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { Helmet } from 'react-helmet';
import { FaBoxOpen } from "react-icons/fa";
export const Context = createContext(null)
const LayoutAdmin = () => {
  const { SubMenu } = Menu;
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const dispatch = useDispatch()
  const [isUser, setIsUser] = useState(false)
  const getUserCurrent = async () => {
    const fetchApi = await axios.get(Summary.getUser.url, { withCredentials: true })
    if (fetchApi.data.success === true) {
      setIsUser(true)
      dispatch(getUser(fetchApi?.data?.user))
    } else {
      navigate('/admin/auth/login')
    }
  }
  useEffect(() => {
    getUserCurrent()
  }, [isUser])
  const navigate = useNavigate();
  const handleLogout = async () => {
    const fetchApi = await axios.get(Summary.logout.url, { withCredentials: true })
    if (fetchApi.data.success === true) {
      toast.success(fetchApi.data.message)
      navigate('/admin/auth/login')
      setIsUser(false)
    }
  }
  const user = useSelector(state => state.loginReducer)
  const [isRole, setIsRole] = useState(false)
  const getRoleCurrent = async () => {
    const fetchApi = await axios.post(Summary.getRole.url, { id: user.role_id }, { withCredentials: true })
    if (fetchApi.data.success === true) {
      setIsRole(true)
      dispatch(getRole(fetchApi?.data?.role))
    }
  }
  useEffect(() => {
    getRoleCurrent()
  }, [isRole])
  const role = useSelector(state => state.roleReducer)

  return (
    <Context.Provider value={
      getUserCurrent
    }>
      {
        isUser ?
          <Layout style={{ minHeight: '100vh' }}>
            <Helmet>
              <title>Trang quản trị</title>
            </Helmet>
            <Sider
              // collapsible
              collapsed={collapsed}
              onCollapse={toggleSidebar}
              style={{ backgroundColor: '#fff', paddingTop: '60px' }}
              breakpoint="lg"
            // collapsedWidth="0"
            >
              <div style={{ position: 'absolute', top: '0', left: 0, zIndex: 1000, padding: '10px' }}>
                <Button onClick={toggleSidebar} style={{ marginBottom: 16 }}>
                  {collapsed ? <FaBars /> : <FaBars />}
                </Button>
              </div>
              <Menu mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#fff' }}>
                {
                  role?.permissions?.includes('products-category_view') &&
                  <SubMenu key="1" icon={<FaChartLine />} title="Dashboard">
                    <Menu.Item key="1.1" icon={<FaChartBar />}>
                      <Link to="charts">Thống kê</Link>
                    </Menu.Item>
                    <Menu.Item key="1.2" icon={<RiDashboardHorizontalFill />}>
                      <Link to="dashboard">Tổng quan</Link>
                    </Menu.Item>
                  </SubMenu>
                }
                {
                  role?.permissions?.includes('products_view') &&
                  <Menu.Item key="2" icon={<GiTempleGate />}>
                    <Link to="products">Danh sách sản phẩm</Link>
                  </Menu.Item>
                }
                <Menu.Item key="9" icon={<FaBoxOpen />}>
                  <Link to="orders">Danh sách đơn hàng</Link>
                </Menu.Item>
                {
                  role?.permissions?.includes('products-category_view') &&
                  <Menu.Item key="3" icon={<BiCategory />}>
                    <Link to="products-category">Danh mục sản phẩm</Link>
                  </Menu.Item>
                }
                {
                  role?.permissions?.includes('roles_view') &&
                  <Menu.Item key="4" icon={<IoAddCircle />}>
                    <Link to="roles">Nhóm quyền</Link>
                  </Menu.Item>
                }
                {
                  role?.permissions?.includes('roles_permissions') &&
                  <Menu.Item key="5" icon={<MdVerifiedUser />}>
                    <Link to="permissions">Phân quyền</Link>
                  </Menu.Item>
                }
                {
                  role?.permissions?.includes('accounts_view') &&
                  <Menu.Item key="6" icon={<FaUserCircle />}>
                    <Link to="accounts">Danh sách tài khoản</Link>
                  </Menu.Item>
                }
                <Menu.Item key="7" icon={<MdAttachEmail />}>
                  <Link to="email">Email</Link>
                </Menu.Item>
                {
                  role?.permissions?.includes('setting_view') &&
                  <Menu.Item key="8" icon={<IoSettings />}>
                    <Link to="settings">Cài đặt chung</Link>
                  </Menu.Item>
                }

              </Menu>
              <Button
                style={{ position: 'absolute', bottom: '20px', left: '10px' }}
                onClick={handleLogout}
              >
                <IoMdLogOut />
              </Button>
            </Sider>
            <Layout>
              <Content style={{ paddingRight: '10px', marginLeft: collapsed ? '20px' : '20px' }}>
                <ToastContainer />
                <Outlet />
              </Content>
            </Layout>
          </Layout>
          :
          <Login />
      }
    </Context.Provider>
  )
}

export default LayoutAdmin
