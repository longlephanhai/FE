/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './headerClient.scss'
import axios from 'axios'
import Summary from '../../../API'
import { Link } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify'
import { RxAvatar } from "react-icons/rx";
import { useSelector } from 'react-redux'
import SubMenu from '../SubMenu/SubMenu'
const Header = ({ logo }) => {
  console.log(logo);

  const userSelector = useSelector(state => state.siginInReducer)
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [category, setCategory] = useState([])
  const checkToken = async () => {
    const fetchApi = await axios.get(Summary.checkTokenUser.url, { withCredentials: true })
    if (fetchApi.data.success === true) {
      setIsLogin(true)
      setUser(fetchApi.data.user)
      setCategory(fetchApi.data.category)
    }
  }
  useEffect(() => {
    checkToken();
  }, [userSelector]);
  const handleLogout = async () => {
    const response = await axios.get(Summary.logoutUser.url, { withCredentials: true })
    if (response.data.success) {
      setIsLogin(false)
      setUser(null)
      toast.success(response.data.message)
    }
  }

  const count = useSelector(state => state.countReducer)

  const [cartItems, setCartItems] = useState([]);
  const fetchApi = async () => {
    const response = await axios.get(Summary.getCart.url, { withCredentials: true })
    if (response.data.success) {
      for (const item of response.data.cart.products) {
        item.product_id.quantity = 1
      }
      setCartItems(response.data.cart.products)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [count])

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/"><img src={logo} alt='' /></a>
        </div>
        <nav className="header__nav">
          <ul className="header__menu">
            <li className='sub-menu'>
              <a>Các loại sách</a>
              <SubMenu items={category} path="/books" />
            </li>
            <li><a href="/about">Về chúng tôi</a></li>
            <li>
              <a href="#footer" onClick={(e) => {
                e.preventDefault();
                const footer = document.getElementById("footer");
                if (footer) {
                  footer.scrollIntoView({ behavior: "smooth" });
                }
              }}>
                Liên hệ
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__actions">
          <div>
            {
              user?.avatar ? <img className='header__avatar' src={user?.avatar} alt='' /> : <RxAvatar className='header__avatar' />
            }
          </div>
          <a href="/cart" className="header__cart">Giỏ hàng <FaCartShopping />
            {
              cartItems.length || count > 0 ?
                <span className="header__cart-notice">({cartItems.length})</span>
                :
                null
            }
          </a>
          <a href='/order'>Đơn hàng</a>
          {
            isLogin || userSelector ?
              <Link to="" className="header__login" onClick={handleLogout}>Đăng xuất</Link>
              :
              <Link to="/sign-in" className="header__login">Đăng nhập</Link>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
