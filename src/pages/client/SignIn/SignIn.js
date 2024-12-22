/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './SignIn.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Summary from '../../../API'
import { toast } from 'react-toastify'
import { signIn } from '../../../actions/client'
import img from '../../../assets/images/col2_htb_img_1.webp'
import UseFetchHook from '../../../components/Client/UseFetchHook/UseFetchHook';

const SignIn = () => {
  const navigate = useNavigate()
  const checkToken = async () => {
    const fetchApi = await axios.get(Summary.checkTokenUser.url, { withCredentials: true })
    if (fetchApi.data.success === true) {
      navigate('/')
    } else {
      navigate('/sign-in')
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post(Summary.signin.url, data, { withCredentials: true })
    if (response.data.success) {
      toast.success(response.data.message)
      dispatch(signIn(response.data.data))
      navigate('/')
    } else {
      toast.error(response.data.message)
    }
  }

  // login with google
  const { handleGoogle, loading, error } = UseFetchHook(
    Summary.googleLogin.url
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        theme: "outline",
        // text: "signin_with",
        shape: "circle",
      });

      // google.accounts.id.prompt()
    }
  }, []);

  return (
    <div className="login">
      <div className="login__overlay"></div>
      <div className="login__container">
        <div className="login__image">
          <img src={img} alt="Book Store" />
        </div>
        <div className="login__content">
          <h2 className="login__title">Đăng nhập</h2>
          <form className="login__form"
            onSubmit={handleSubmit}
          >
            <div className="login__group">
              <label htmlFor="email" className="login__label">Email</label>
              <input
                type="email"
                id="email"
                name='email'
                className="login__input"
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="login__group">
              <label htmlFor="password" className="login__label">Password</label>
              <input
                type="password"
                id="password"
                name='password'
                className="login__input"
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>
            <p className='login__forgotPassword' onClick={() => navigate('forgot-password')}>Quên mật khẩu?</p>
            <button type="submit" className="login__button">Đăng nhập</button>
            <div className='login__google'>
              hoặc <div id="loginDiv"></div>
            </div>
          </form>
          <p className="login__footer">
            Bạn chưa có tài khoản? <Link to="/sign-up" className="login__link">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
