import instance from "./redux/auth/authOperations";
//    const instance = axios.create({
//   baseURL: 'http://localhost:8000'
//    });
// const token = JSON.parse(localStorage.getItem('persist:authorisation')).token
// console.log('token',token);
// let config = {}
// token ? config = { headers: { 'Authorization': `Bearer ${token}` } } : config = {};

// auth------------------------------------------
// export const loginAction = async (data) => {
//     try {
//         const res = await instance.post('/user/login', data);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };
// export const registerAction = async (data) => {
//     try {
//         const res = await instance.post('/user/register', data);
//         if (typeof res.data === 'string') throw new Error(res.data);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getChatroomById = async (id) => {
    try {
        const res = await instance.get(`/chatroom/${id}`);
        // if (res.data === 'invalid token') return localStorage.removeItem('token')
        return res.data;
    } catch (error) {
         console.log(error);
    }

};
export const getMessagesBychatroom = async (id) => {
    try {
        const res = await instance.post('/messages/chat', { id });
        // if (res.data === 'invalid token') return localStorage.removeItem('token');
        return res.data
    } catch (error) {
        console.log(error);
    }
};

export const createChatroom = async (data) => {
    try {
        const res = await instance.post('/chatroom', data);
        // if (res.data === 'invalid token') return localStorage.removeItem('token');
        return res.data
    } catch (error) {
        console.log(error);
    }
};
export const getAllChatrooms = async () => {
    try {
        const res = await instance.get('/chatroom');
        // if (res.data === 'invalid token') return localStorage.removeItem('token');
        return res.data
    } catch (error) {
        console.log(error);
    }
};

export const updateUserImage = async (data) => {
    try {
        const res = await instance.patch('/user', data);
        // if (res.data === 'invalid token') return localStorage.removeItem('token');
        return res.data
    } catch (error) {
        console.log(error);
    }
};


// "https://test-chat-backend.onrender.com"
// "http://localhost:8000"