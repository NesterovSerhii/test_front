import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://test-back-kd6p.onrender.com',
});

export const fetchData = async () => {
  try {
    const response = await instance.get('/api/shops');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const sendOrder = async (order) => {
  try {
    const response = await instance.post('/api/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error sending order:', error);
    throw error;
  }
};
