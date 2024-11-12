/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './Verify.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Summary from '../../../API';
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  console.log(success, orderId);

  const navigate = useNavigate()
  const fetchApi = async () => {
    const response = await axios.post(Summary.verifyOrder.url, { success, orderId }, { withCredentials: true });
    if (response.data.success) {
      navigate('/success')
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    fetchApi();
  }, [])
  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  )
}

export default Verify
