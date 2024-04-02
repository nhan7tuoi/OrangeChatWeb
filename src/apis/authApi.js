import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

const  login = async ({username,password}) => {
    console.log(username);
    console.log(password);
    try {
        const response = await instance.post('/auth/login',
            {
                username: username,
                password: password,
            });
            console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const register = async (data) => {
    console.log("data", data);
    try {
        const response = await instance.post('/auth/register', {
            name: data.name,
            phone: data.phone,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            image: data.image,
            gender:data.gender,
            password: data.password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const verifycation = async ({username}) => {
    try {
        const response = await instance.post('/auth/verifycation', {
            username: username
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const forgotPassword = async ({username}) => {
    try {
        const response = await instance.post('/forgotpassword', {
            username: username
        });
    } catch (error) {
        throw new Error(error);
    }
}

const refreshToken = async ({token}) => {
    console.log('token', refreshToken);
    try {
        const response = await instance.post('/auth/refresh', {
            refreshToken: token
        });
        console.log('responseapi', response);
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw new Error(error);
    }
};

const searchUsers = async ({keyword,userId}) => {
  try {
    const data = {keyword:keyword,userId:userId}
    const queryParam = new URLSearchParams(data).toString();
    const response = await instance.get(`/users?`+queryParam);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export default {
    login,
    register,
    verifycation,
    forgotPassword,
    refreshToken,
    searchUsers
}

