import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fastpay-server-api.vercel.app/',
    // baseURL: 'http://localhost:3000/',
    
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;

