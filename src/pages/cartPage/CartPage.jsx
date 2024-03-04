import React, { useEffect, useState } from 'react';
import css from './Cart.module.css';
import { useCart } from '../../cartContext';
import { sendOrder } from '../../api/api'; 

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [count, setCount] = useState(() => {
    const storedData = localStorage.getItem('cartData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.count || {};
    }
    return {};
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const order = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      items: cart.map((item, index) => ({
        name: item.name,
        quantity: Number(count[index] || 1),
        price: Number(item.price),
      })),
      total: calculateTotal(),
    };

    try {
      const response = await sendOrder(order);
      console.log('Order submitted successfully:', response.data);

      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });

      setCount({});

      localStorage.removeItem('cartData');
      localStorage.removeItem('cart');

    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const [index, item] of cart.entries()) {
      total += (count[index] || 1) * item.price;
    }
    return total;
  };

  useEffect(() => {
    const storedData = localStorage.getItem('cartData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCount(parsedData.count || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify({ cart, count }));
  }, [cart, count]);

  const increaseCount = (index) => {
    const updatedCount = {
      ...count,
      [index]: (count[index] || 1) + 1
    };
    setCount(updatedCount);
    updateLocalStorageCount(updatedCount);
  };

  const decreaseCount = (index) => {
    if (count[index] > 0) {
      const updatedCount = {
        ...count,
        [index]: count[index] - 1
      };
      setCount(updatedCount);
      updateLocalStorageCount(updatedCount);
    }
  };

  const updateLocalStorageCount = (updatedCount) => {
    const storedData = localStorage.getItem('cartData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      localStorage.setItem('cartData', JSON.stringify({
        ...parsedData,
        count: updatedCount
      }));
    }
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleOrderSubmit}>
        <div className={css.inputContainer}>
          <label className={css.label} htmlFor="name">Name:</label>
          <input onChange={handleInputChange} id="name" type="text" name="name" />
        </div>
        <div className={css.inputContainer}>
          <label className={css.label} htmlFor="email">Email:</label>
          <input onChange={handleInputChange} id="email" type="email" name="email" />
        </div>
        <div className={css.inputContainer}>
          <label className={css.label} htmlFor="phone">Phone:</label>
          <input onChange={handleInputChange} id="phone" type="tel" name="phone" />
        </div>
        <div className={css.inputContainer}>
          <label className={css.label} htmlFor="address">Address:</label>
          <input onChange={handleInputChange} id="address" type="text" name="address" />
        </div>
        <button className={css.cartBtn} type='submit'>Send order</button>
      </form>
      <div>
        <ul className={css.cartList}>
          {cart && cart.map((item, index) => (
            <li className={css.cartItem} key={index}>
              <h3>{item.name}</h3>
              <img className={css.cardImage} src={item.url} alt='drug' />
              <h4>Price: {item.price}$</h4>
                <div className={css.counter}>
                <button onClick={() => decreaseCount(index)}>-</button>
                <span>{count[index] || 1}</span>
                <button onClick={() => increaseCount(index)}>+</button>
              </div>
              <button className={css.cartBtn} onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total Price: {calculateTotal()}$</p>
      </div>
    </div>
  );
};

export default CartPage;
