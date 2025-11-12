import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fastpay-server-bay.vercel.app/',
    timeout: 3000,
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;

