import React, { useEffect, useState } from 'react'
import './OTP-password.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Summary from '../../../API';
const OTP_Password = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailSearch = searchParams.get("email");
  const [email, setEmail] = useState(emailSearch);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(180);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      toast.error('Thời gian xác thực đã hết hạn. Vui lòng yêu cầu mã OTP mới.');
    }
  }, [countdown]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(Summary.otpPassword.url, { email, otp }, { withCredentials: true });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate('/sign-in/reset-password?email=' + email);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="otp-verification">
      <div className="otp-verification__container">
        <h2>Xác thực OTP</h2>
        {message && <p className="otp-verification__container__message">{message}</p>}
        <form className="otp-verification__container__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="otp-verification__container__form__label">Địa chỉ Email</label>
          <input
            type="email"
            id="email"
            className="otp-verification__container__form__input"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập địa chỉ email của bạn"
            required
          />
          <label htmlFor="otp" className="otp-verification__container__form__label">Mã OTP</label>
          <input
            type="text"
            id="otp"
            className="otp-verification__container__form__input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            required
          />
          <p className="otp-verification__container__form__timer">Thời gian còn lại: {formatTime(countdown)}</p>
          <button type="submit" className="otp-verification__container__form__button">Xác thực</button>
        </form>
      </div>
    </div>
  )
}

export default OTP_Password
