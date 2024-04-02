import axios from 'axios';

const BASE_URL = 'http://192.168.2.58:3000/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

//get conversation by userId
const getConversation = async ({userId}) => {
    try {
        const response = await instance.get(`/conversation/${userId}`);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};

export default {
    getConversation,
}