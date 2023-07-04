import axios from "axios";
axios.defaults.baseURL = 'https://test-chat-backend.onrender.com';

const setToken = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
    axios.defaults.headers.common.Authorization = '';
};
// auth------------------------------------------
export const login = async (data) => {
    try {
        const res = await axios.post('/user/login', data);
        if (typeof res.data === 'string') throw new Error(res.data);
        setToken(res.data.token);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const register = async (data) => {
    try {
        const res = await axios.post('/user/register', data);
        if (typeof res.data === 'string') throw new Error(res.data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const logout = () => {
    clearToken();
}
// auth------------------------------------------//

// operations-------------//
export const getChatroomById = async (id) => {
    try {
        const chatRoomInfo = await axios.get(`/chatroom/${id}`);
        if (typeof chatRoomInfo.data === 'string') throw new Error(chatRoomInfo.data);
        return chatRoomInfo.data;
    } catch (error) {
         console.log(error);
    }

};
export const getMessagesBychatroom = async (id) => {
    try {
        const messages = await axios.post('/messages/chat', { id });
        if (typeof messages.data === 'string') throw new Error(messages.data);
        return messages.data
    } catch (error) {
        console.log(error);
    }
};

export const createChatroom = async (data) => {
    try {
        const room = await axios.post('/chatroom', data);
        if (typeof room.data === 'string') throw new Error(room.data);
        return room.data
    } catch (error) {
        console.log(error);
    }
};
export const getAllChatrooms = async () => {
    try {
        const res = await axios.get('/chatroom');
        if (typeof res.data === 'string') throw new Error(res.data);
        return res.data
    } catch (error) {
        console.log(error);
    }
};


// "https://test-chat-backend.onrender.com"
// "http://localhost:8000"