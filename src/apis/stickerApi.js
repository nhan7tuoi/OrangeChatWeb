import axios from 'axios';
import IPV4 from './ipv4';
const token = localStorage.getItem('token');

const BASE_URL = `https://${IPV4}/api/v1`;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

//get all sticker
const getSticker = async () => {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await instance.get('/allstickers',{
      headers: headers,
    
    });
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log('error nè', error);
    throw error;
  }
};

export default {getSticker};