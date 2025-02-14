import axios from 'axios';

export const fetchItems = async (query) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    return response.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};