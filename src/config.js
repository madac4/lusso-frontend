import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'https://lusso.herokuapp.com/api',
    baseURL: 'http://192.168.100.15:3005/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
