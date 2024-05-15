// api.js
import axios from 'axios';

export const fetchProducts = () => {
  return axios.get('http://localhost:8002/products/all');
};

export const fetchInventory = () => {
  return axios.get('http://localhost:8003/inventory');
};

export const createCustomer = async (customerData) => {
  console.log("customerId",customerData)
  try {
    const response = await axios.post('http://localhost:8006/shoppingservice/customer', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const createCart = async (customerId, cartData) => {

  console.log("customerId",customerId)
  console.log("cart",typeof cartData)
  const payload = [cartData];
  try {
    const response = await axios.put(`http://localhost:8006/shoppingservice/customer/${customerId}`, payload);
    return response.data;
  } catch (error) {
    if (error.response) {
             console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
    } else if (error.request) {
        console.error('Error request:', error.request);
    } else {
        console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
}

};

export const createOrder= async (customerId) => {
  console.log("customerId",customerId)
  try {
    const response = await axios.post(`http://localhost:8006/shoppingservice/customer/${customerId}/order`);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};


export const GetOrder= async (customerId) => {
  console.log("customerId",customerId)
  try {
    const response = await axios.get(`http://localhost:8006/shoppingservice/customer/${customerId}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};