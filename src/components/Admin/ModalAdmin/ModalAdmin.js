import React from 'react'
import './ModalAdmin.scss'
import { Modal } from 'antd';
const ModalAdmin = ({ open, onClose, id, email, description }) => {

  return (
    <div>
      <Modal
        title={
          <span className="modal-title">
            Thông tin
          </span>
        }
        open={open}
        onOk={onClose}
        onCancel={onClose}
        okText="Xác nhận"
        cancelText="Hủy"
        className="custom-modal"
        centered
        width={600}
      >
        <div className="modal-content">
          <div className="modal-info">
            <strong>Từ:</strong> {email}
          </div>
          <div className="modal-description">
            <strong>Nội dung:</strong>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModalAdmin
