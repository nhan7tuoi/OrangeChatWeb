import axios from 'axios';
import IPV4 from './ipv4';
const token = localStorage.getItem('token');

const BASE_URL = `https://${IPV4}/api/friend`;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const getFriends = async ({userId}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await instance.get(`/getFriends/${userId}`,{
      headers: headers,
    
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const getFriendRequests = async ({userId}) => {
  try {
    const res = await instance.get(`/getFriendRequest/${userId}`);
    return res.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const getAllFriendRequests = async({userId})=>{
  try {
    const res = await instance.get(`/getAllFriendRequests/${userId}`);
    return res.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

const sendFriendRequest = async ({receiverId, senderId}) => {
  try {
    const res = await instance.post('/send', {
      senderId,
      receiverId,
    });
  } catch (error) {
    throw error;
  }
};

const accept = async ({friendRequestId}) => {
  try {
    const res = await instance.put(`/${friendRequestId}`);
  } catch (error) {
    throw error;
  }
};

const reject = async ({friendRequestId}) => {
  try {
    const res = await instance.delete(`/${friendRequestId}`);
  } catch (error) {
    throw error;
  }
};
export default {getFriends, getFriendRequests, sendFriendRequest, accept,reject,getAllFriendRequests};