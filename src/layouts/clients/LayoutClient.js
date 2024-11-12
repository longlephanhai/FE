/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Header from '../../components/Client/HeaderClient/headerClient.component'
import Footer from '../../components/Client/FooterClient/footerClient.component'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Summary from '../../API';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/client';

function LayoutClient() {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()
  const fetchApi = async () => {
    const response = await axios.get(Summary.detailUser.url, { withCredentials: true })
    if (response.data.success) {
      setIsLogin(true)
      dispatch(signIn(response.data.user))
    }
  }
  useEffect(() => {
    fetchApi()
  }, [isLogin])

  // lấy cài đặt chung
  const [setting, setSetting] = useState({})
  const fetchSetting = async () => {
    const response = await axios.get(Summary.setting.url, { withCredentials: true })
    if (response.data.success) {
      setSetting(response.data.setting)
    }
  }
  useEffect(() => {
    fetchSetting()
  }, [])


  return (
    <>
      <Header logo={setting.logo} />
      <main style={{
        minHeight: '100vh'
      }}>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer copyright={setting.copyright} address={setting.address} Email={setting.email} phone={setting.phone} />
    </>
  )
}

export default LayoutClient
