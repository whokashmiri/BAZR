import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const fetchAllItems = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchItemsByCategory = async (category: string) => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data;
};