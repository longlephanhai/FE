import React, { useEffect, useState } from 'react';
import './Cart.scss';
import axios from 'axios';
import Summary from '../../../API';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { count } from '../../../actions/client';
import { toast } from 'react-toastify';


const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const fetchApi = async () => {
    const response = await axios.get(Summary.getCart.url, { withCredentials: true })
    if (response.data.success) {
      setCartItems(response.data.cart.products)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])
  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    try {
      const response = await axios.post(Summary.updateQuantity.url, { id, quantity: newQuantity }, { withCredentials: true });
      if (response.data.success) {
        fetchApi();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const dispatch = useDispatch()
  const handleRemoveItem = async (id) => {
    const response = await axios.post(Summary.deleteCart.url, { id }, { withCredentials: true })
    if (response.data.success) {
      dispatch(count(-1))
      fetchApi()
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.product_id.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  // thanh toán
  const navigate = useNavigate();
  const handleCheckout = async () => {
    if(cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }
    localStorage.setItem('total', totalPrice);
    navigate('/payment');
  }
  return (
    <div className="cart">
      <h2 className="cart__title">Giỏ hàng của bạn</h2>
      <div className="cart__list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart__item">
            <img src={item.product_id.thumbnail} alt={item.product_id.title} className="cart__item-image" />
            <div className="cart__item-details">
              <h3 className="cart__item-title">{item.product_id.title}</h3>
              <p className="cart__item-price">{item.product_id.price.toLocaleString()}.000đ</p>
              <div className="cart__item-quantity">
                <button
                  className="cart__item-quantity-btn"
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="cart__item-quantity-input"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                  readOnly
                />
                <button
                  className="cart__item-quantity-btn"
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="cart__item-remove"
              onClick={() => handleRemoveItem(item.product_id._id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="cart__checkout">
        <div className="cart__checkout--total">
          <p>Tổng cộng:</p>
          <p>{totalPrice}.000đ</p>
        </div>
        <button className="cart__checkout-btn" onClick={handleCheckout}>Thanh toán</button>
      </div>
    </div>

  );
};

export default Cart;
