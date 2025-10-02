import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://server-eight-alpha-29.vercel.app`
    // baseURL: `http://localhost:5000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;