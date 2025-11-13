import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fastpay-server-api.vercel.app/',
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;

