import React, { useState } from 'react';
import './ForgotPassword.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Summary from '../../../API';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(Summary.forgotPassword.url, { email: email })
    if (!response.data.success) {
      return setMessage(response.data.message);
    }
    setMessage(`Đã gửi yêu cầu đặt lại mật khẩu đến email ${email}`);
    setEmail('');
    navigate(`otp-password?email=${email}`)
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <h2>Quên mật khẩu</h2>
        {message && <p className="forgot-password__container__message">{message}</p>}
        <form className="forgot-password__container__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="forgot-password__container__form__label">Địa chỉ Email</label>
          <input
            type="email"
            id="email"
            className="forgot-password__container__form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-password__container__form__button">Gửi yêu cầu</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
