import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fastpay-server-api.onrender.com/',
    // baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
    
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;

