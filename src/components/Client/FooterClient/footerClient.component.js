import React, { useState } from 'react'
import './footer.scss'
import { Input } from 'antd';
import facebook from '../../../assets/images/facebook_icon.png'
import linked from '../../../assets/images/linkedin_icon.png'
import twitter from '../../../assets/images/twitter_icon.png'
import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Footer = ({ copyright, address, Email,phone }) => {
  const { Search } = Input;
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const handleSendEmail = async (email) => {
    navigate(`/send-email?email=${email}`)
  }
  return (
    <div className='footer' id='footer'>
      <div className='footer__newsletter'>
        <MdMarkEmailRead className='footer__newsletter-icon' />
        <p className='footer__newsletter-text'>
          Bạn có thể gửi phản hồi qua email đến <strong>support@example.com</strong>
        </p>
        <div className='footer__newsletter-input'>
          <Search
            name="email"
            placeholder="Nhập email của bạn"
            enterButton="Gửi email"
            onSearch={handleSendEmail}
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={""} alt='' />
          <p>
            Chúng tôi cung cấp một bộ sưu tập phong phú các cuốn sách từ nhiều thể loại khác nhau, từ văn học cổ điển đến sách giáo khoa, sách hướng dẫn, và sách tham khảo. Tại [Tên Nhà Sách], chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tuyệt vời với dịch vụ khách hàng tận tâm và giao hàng nhanh chóng.
            Theo dõi chúng tôi trên các mạng xã hội để cập nhật những ưu đãi mới nhất và những tựa sách hot nhất. Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua thông tin ở dưới đây.</p>
          <div className='footer-social-icons'>
            <img src={facebook} alt='' />
            <img src={linked} alt='' />
            <img src={twitter} alt='' />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>Công ty</h2>
          <ul>
            <li>Trang chủ</li>
            <li>Về chúng tôi</li>
            <li>Vận chuyển</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>Liên hệ</h2>
          <ul>
            <li>Số điện thoại: {phone}</li>
            <li>Email: {Email}</li>
            <li>Địa chỉ: {address}</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>{copyright} </p>
    </div>


  )
}

export default Footer
