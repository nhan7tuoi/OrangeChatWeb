import axios from 'axios';
import IPV4 from './ipv4';

const BASE_URL = `http://${IPV4}:3000/api/v1`;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

//get all sticker
const getSticker = async () => {
  try {
    const response = await instance.get('/allstickers');
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log('error nè', error);
    throw error;
  }
};

export default {getSticker};