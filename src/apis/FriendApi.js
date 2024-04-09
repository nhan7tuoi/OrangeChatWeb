import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/friend';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const getFriends = async ({userId}) => {
  try {
    const response = await instance.get(`/getFriends/${userId}`);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export default {getFriends}