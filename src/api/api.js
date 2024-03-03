import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://drugshopbackend.onrender.com/',
});

export const fetchData = async () => {
  try {
    const response = await instance.get('api/shops');
    console.log('data', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
