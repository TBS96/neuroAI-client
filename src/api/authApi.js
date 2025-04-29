import axios from 'axios'
import conf from '../conf/conf'

const API = axios.create({
    baseURL: conf.backendUrl,
});

export const loginUser = async (formData) => {
    const res = await API.post('/login', formData);
    return res.data;
};

export const registerUser = async (formData) => {
    const res = await API.post('/regiser', formData);
};