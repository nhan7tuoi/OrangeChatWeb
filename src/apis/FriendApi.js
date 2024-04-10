import axios from 'axios';
import IPV4 from './ipv4';

const BASE_URL = `http://${IPV4}:3000/api/friend`;

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

const getFriendRequests = async ({userId}) => {
  try {
    const res = await instance.get(`/getFriendRequest/${userId}`);
    return res.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

const getAllFriendRequests = async()=>{
   try {
     const res = await instance.get(`/getAllFriendRequests`);
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