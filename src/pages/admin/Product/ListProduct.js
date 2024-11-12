/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Summary from '../../../API'
import './ListProduct.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from 'react-redux'
import { CiEdit } from "react-icons/ci";
import { Pagination, Button, Table, Input, Select, message } from 'antd'
import { toast } from 'react-toastify'

const { Option } = Select;

const ListProduct = () => {
  const location = useLocation()
  const navigate = useNavigate();

  // filter
  const handleOnClick = (status) => {
    navigate(`/admin/products?status=${status}`)
  }

  // pagination 
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const getData = async () => {
    const fetchApi = await axios.get(Summary.getProduct.url + `/${location.search}`, { withCredentials: true })
    setData(fetchApi.data.products);
    setTotalPage(fetchApi.data.countProduct)
  }
  useEffect(() => {
    getData()
  }, [location])

  const user = useSelector(state => state.loginReducer)

  // delete
  const handleDelete = async (id) => {
    const fetchApi = await axios.post(Summary.deleteProduct.url, { id, user }, { withCredentials: true })
    if (fetchApi.data.success) {
      getData()
      toast.success('Xóa sản phẩm thành công');
    }
  }

  // get current page 
  const [currentPage, setCurrentPage] = useState(1)
  const handleChangePage = (page) => {
    setCurrentPage(page)
    navigate(`/admin/products?page=${page}`)
  }

  // search product
  const [search, setSearch] = useState('')
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleSearch = () => {
    navigate(`/admin/products?search=${search}`)
  }

  // sort
  const handleOnChangeSort = (value) => {
    const [key, order] = value.split('-')
    navigate(`/admin/products?sortKey=${key}&sortValue=${order}`)
  }

  // reset
  const handleReset = () => {
    navigate(`/admin/products`)
    setSearch('')
  }

  // cập nhật nhiều
  const [checkAll, setCheckAll] = useState(false)
  const [checkItem, setCheckItem] = useState([])

  const handleCheckAll = (e) => {
    const isChecked = e.target.checked
    setCheckAll(isChecked)
    setCheckItem(isChecked ? data.map(item => item._id) : [])
  }

  const handleCheckItem = (e, id) => {
    const isChecked = e.target.checked
    setCheckItem(prev =>
      isChecked ? [...prev, id] : prev.filter(item => item !== id)
    )
    setCheckAll(checkItem.length + (isChecked ? 1 : -1) === data.length)
  }

  // button áp dụng
  const [type, setType] = useState("")
  const handleOnChangeAccept = (value) => {
    setType(value)
  }
  const handleAccept = async () => {
    const fetchApi = await axios.post(Summary.changeMultiStatus.url, { checkItem, type }, { withCredentials: true })
    if (fetchApi.data.success) {
      toast.success(fetchApi.data.message)
      getData()
    } else {
      toast.error(fetchApi.data.message)
    }
  }

  const columns = [
    {
      title: <input type="checkbox" checked={checkAll} onChange={handleCheckAll} />,
      dataIndex: 'checkbox',
      render: (_, record) => (
        <input type='checkbox' checked={checkItem.includes(record._id)} onChange={(e) => handleCheckItem(e, record._id)} />
      )
    },
    {
      title: 'STT',
      dataIndex: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      render: (thumbnail) => <img src={thumbnail} width={100} height="auto" alt='' />,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price) => `${price} vnđ`,
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      render: (_, record) => <Input type='number' defaultValue={record.position} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => (status === "active" ? "Hoạt động" : "Không hoạt động"),
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      render: (createdBy) => createdBy.account_id?.fullName,
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      render: (updatedBy) => updatedBy[updatedBy.length - 1]?.account_id?.fullName,
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <Link to={`/admin/products/detail/${record.slug}`}><CiEdit />Chi tiết</Link>
          {
            role?.permissions?.includes('products_edit') &&
            <Link to={`/admin/products/edit/${record.slug}`}><CiEdit />Chỉnh sửa</Link>
          }
          {
            role?.permissions?.includes('products_delete') &&
            <Button type="link" onClick={() => handleDelete(record._id)}><RiDeleteBin6Fill />Xóa</Button>
          }
        </>
      )
    },
  ];
  const role = useSelector(state => state.roleReducer)

  return (
    <div className='products'>
      <h2 className='products__title'>Trang danh sách sản phẩm</h2>
      <div className='products__filter'>
        <p className='products__filter-text'>Bộ lọc và tìm kiếm</p>
        <div className='products__filter-status'>
          <Button className={`products__filter-status-button ${location.search === "?status=" || location.search === "" ? "products__filter-status-button-active" : ""}`} type="primary" onClick={() => handleOnClick('')} name=''>Tất cả</Button>
          <Button className={`products__filter-status-button ${location.search === "?status=active" ? "products__filter-status-button-active" : ""}`} type="primary" onClick={() => handleOnClick('active')} name='active'>Hoạt động</Button>
          <Button className={`products__filter-status-button ${location.search === "?status=inactive" ? "products__filter-status-button-active" : ""}`} type="primary" onClick={() => handleOnClick('inactive')} name='inactive'>Dừng hoạt động</Button>
        </div>
        <div className='products__filter-search'>
          <Input placeholder="Tìm kiếm sản phẩm" value={search} onChange={handleOnChangeSearch} />
          <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
        </div>
      </div>

      <div className='products__sort'>
        <p className='products__sort-text'>Sắp xếp</p>
        <div className='products__sort-controls'>
          <Select defaultValue="position-desc" onChange={handleOnChangeSort} style={{ width: 200 }}>
            <Option value="position-desc">Vị trí giảm dần</Option>
            <Option value="position-asc">Vị trí tăng dần</Option>
            <Option value="price-desc">Giá giảm dần</Option>
            <Option value="price-asc">Giá tăng dần</Option>
            <Option value="title-asc">Tiêu đề A - Z</Option>
            <Option value="title-desc">Tiêu đề Z - A</Option>
          </Select>
          <Button onClick={handleReset}>Làm mới</Button>
        </div>
      </div>

      <div className='products__actions'>
        <p className='products__actions-text'>Danh sách sản phẩm</p>
        <div className='products__actions-controls'>
          {
            role?.permissions?.includes('products_edit') &&
            <>
              <Select defaultValue="" onChange={handleOnChangeAccept} style={{ width: 200 }}>
                <Option value="" disabled> -- Chọn hành động --</Option>
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Dừng hoạt động</Option>
                <Option value="delete-all">Xóa tất cả</Option>
              </Select>
              <Button type="primary" onClick={handleAccept}>Áp dụng</Button>
            </>
          }

        </div>
        {
          role?.permissions?.includes('products_create') &&
          <Link to={"/admin/products/create"} className='products__actions-addnew'>+Thêm mới</Link>
        }

      </div>

      <div className='products__list'>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <Pagination defaultCurrent={1} current={currentPage} total={totalPage + 10} onChange={handleChangePage} />
      </div>
    </div>
  )
}

export default ListProduct
