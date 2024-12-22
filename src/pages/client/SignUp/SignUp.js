import React, { useState } from 'react'
import './SignUp.scss'
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import Summary from '../../../API';
import img from '../../../assets/images/col2_htb_img_1.webp'
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    avatar: null,
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [previewImage, setPreviewImage] = useState('');
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setData((prevState) => ({
        ...prevState,
        avatar: file
      }));
    }
  };
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setData((prevState) => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    } else if (data.password.length < 8) {
      toast.error("Mật khẩu phải lớn hơn 8 kí tự");
    } else {
      console.log(data);
      const response = await axios.post(Summary.resgister.url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/sign-in')
      } else {
        toast.error(response.data.message);
      }
    }
  }
  return (
    <div className="signup">
      <div className="signup__overlay"></div>
      <div className="signup__container">
        <div className="signup__image">
          <img src={img} alt="Book Store" />
        </div>
        <div className="signup__content">
          <h2 className="signup__title">Tạo tài khoản</h2>
          <form className="signup__form"
            onSubmit={handleSubmit}
          >
            <div className="signup__group signup__avatar">
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="signup__input signup__input--file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="avatar" className="signup__avatar-label">
                {previewImage ? (
                  <img src={previewImage} alt="Avatar Preview" className="signup__avatar-image" name='avatar' />
                ) : (
                  <FaUserCircle className="signup__avatar-icon" />
                )}
              </label>
            </div>
            <div className="signup__group">
              <label htmlFor="name" className="signup__label">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="signup__input"
                value={data.name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="signup__group">
              <label htmlFor="email" className="signup__label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="signup__input"
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="signup__group">
              <label htmlFor="password" className="signup__label">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                className="signup__input"
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="signup__group">
              <label htmlFor="confirmPassword" className="signup__label">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="signup__input"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
              />
            </div>
            <button type="submit" className="signup__button">Đăng ký</button>
          </form>
          <p className="signup__footer">
            Bạn đã có tài khoản? <Link to="/sign-in" className="signup__link">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
