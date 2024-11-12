import React, { useEffect, useState } from 'react'
import './Home.scss'
import Banner from '../../../components/Client/Banner/Banner'
import OutStandingProduct from '../../../components/Client/OutStandingProduct/OutStandingProduct'
import NewProduct from '../../../components/Client/NewProduct/NewProduct'
import axios from 'axios'
import Summary from '../../../API'
import { Helmet } from 'react-helmet';
const Home = () => {
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
      <Helmet>
        <title>{setting.websiteName}</title>
        <meta name="description" content={setting.description} />
      </Helmet>
      <div >
        <Banner banner={setting.banner} />
      </div>
      <div style={{ margin: 10 }}>
        <OutStandingProduct />
      </div>
      <div style={{ margin: 10 }}>
        <NewProduct />
      </div>
    </>
  )
}

export default Home
