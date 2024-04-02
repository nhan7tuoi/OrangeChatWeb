import axios from 'axios';

const BASE_URL = 'http://192.168.2.58:3000/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,

})

//ham get message theo conversationId
const getMessage = async ({conversationId}) => {
    try {
        const response = await instance.get(`/messages/${conversationId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    getMessage
}