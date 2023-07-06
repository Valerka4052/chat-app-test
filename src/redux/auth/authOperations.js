import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

const instance = axios.create({
  baseURL: 'https://test-chat-backend.onrender.com'
});
function setToken(token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function clearToken() {
    instance.defaults.headers.common.Authorization = '';
}

export const signUp = createAsyncThunk(
    'authorisation/signUp',
    async function (newUser, thunkAPI) {
        try {
            const response = await instance.post(`/user/register`, newUser);
            // setToken(response.data.token);
            return response.data;
        } catch (error) {
            Notiflix.Report.failure(error.message);
            thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const LogIn = createAsyncThunk(
    'authorisation/LogIn',
    async function (user, thunkAPI) {
        try {
            const response = await instance.post(`/user/login`, user);
            // console.log('res',response);
            setToken(response.data.token);
            return response.data;
        } catch (error) {
            Notiflix.Report.failure('wrong email or password!!!');
            thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const LogOut = createAsyncThunk(
    'authorisation/LogOut',
    async function (_, thunkAPI) {
        try {
            // const response = await axios.post(`/users/logout`);
           return clearToken();
            // return response.data
        } catch (error) {
            Notiflix.Report.failure(error.message)
            thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const refreshUser = createAsyncThunk(
    'authorisation/refreshUser',
    async (_, thunkAPI) => {
        const { token } = thunkAPI.getState().authorisation;
        if (token === null) {
            return thunkAPI.rejectWithValue('no valid token');
        }
        try {
            setToken(token);
            const response = await instance.get('/user/current');
            // console.log('res',response);
            return response
        } catch (error) {
            thunkAPI.rejectWithValue(error.data.message);
        }
    },
);
export const updateUser = createAsyncThunk(
    'authorisation/UpdateUser',
    async (data, thunkAPI) => {
        console.log('data',data);
        const { token } = thunkAPI.getState().authorisation;
        if (token === null) {
            return thunkAPI.rejectWithValue('no valid token');
        }
        try {
            setToken(token);
            console.log('data',data);
            const response = await instance.patch('/user', data);
            // console.log('res',response);
            return response
        } catch (error) {
            thunkAPI.rejectWithValue(error.data.message);
        }
    },
);
export default instance