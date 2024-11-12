import React, { useState } from 'react';
import './ResetPassword.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Summary from '../../../API';
const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailSearch = searchParams.get("email");
  const [email, setEmail] = useState(emailSearch);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thử lại!");
    } else if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp. Vui lòng thử lại!");
    } else {
      const response = await axios.post(Summary.resetPassword.url, { email, password }, { withCredentials: true });
      if (response.data.success) {
        setMessage(response.data.message);
        navigate('/sign-in');
      } else {
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password__container">
        <h2>Đặt lại mật khẩu</h2>
        {message && <p className="reset-password__container__message">{message}</p>}
        <form className="reset-password__container__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="reset-password__container__label">Địa chỉ Email</label>
          <input
            type="email"
            id="email"
            className="reset-password__container__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập địa chỉ email của bạn"
            disabled
          />
          <label htmlFor="password" className="reset-password__container__label">Mật khẩu mới</label>
          <input
            type="password"
            id="password"
            className="reset-password__container__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            required
          />
          <label htmlFor="confirmPassword" className="reset-password__container__label">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            className="reset-password__container__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            required
          />
          <button type="submit" className="reset-password__container__button">Đặt lại mật khẩu</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
