import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Summary from '../../../API'
import moment from 'moment'
import { Button, Card, Table } from 'antd';
import ModalAdmin from '../../../components/Admin/ModalAdmin/ModalAdmin';
import { useNavigate } from 'react-router-dom';
const Email = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const fetchApi = async () => {
    const response = await axios.get(Summary.getEmail.url, { withCredentials: true })
    if (response.data.success) {
      setData(response.data.emails)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const handleOpenModal = (id, email, description) => {
    setId(id)
    setEmail(email)
    setDescription(description)
    setOpen(prev => !prev)
  }
  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
      responsive: ['md'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      responsive: ['md'],
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (text) => moment(text).format('DD/MM/YYYY, h:mm:ss a'),
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <Button type="primary" style={{ marginRight: '8px' }} onClick={() => handleOpenModal(record._id, record.email, record.description)}>Xem</Button>
          <Button type="default" onClick={() => navigate(`${record.email}`, { state: {title:record.title,id:record._id} })}>Phản hồi</Button>
        </>
      ),
    },
  ];
  return (
    <Card title="Danh sách Email">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id}
        scroll={{ x: 'max-content' }}
        summary={(pageData) => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng số:</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{data.length}</Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
      />
      <ModalAdmin open={open} onClose={hideModal} id={id} email={email} description={description} />
    </Card>

  )
}

export default Email
