import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Summary from '../../../API';
import './BasicArea.scss'
const BasicArea = () => {
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.basicArea.url, { withCredentials: true })
    setData(response.data.dataChart)
  }
  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div className='chart-container'>
      <div>
        <p className="chart-title">Doanh thu hàng tháng</p>
      </div>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 0,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="tổng" stroke="#0033CC" fill="#95A3F8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BasicArea
