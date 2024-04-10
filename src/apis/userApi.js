import axios from 'axios';
import IPV4 from './ipv4';


const BASE_URL = `http://${IPV4}:3000/api/v1`;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

//up avatar
const uploadAvatar = async ({userId,image}) => {
    try {
        const response = await instance.post('/uploadAvatar', {
            userId: userId,
            image: image,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    uploadAvatar
}