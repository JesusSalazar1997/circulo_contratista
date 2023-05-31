import axios from "axios";

const clienteAxios = axios.create({
    //  baseURL: `http://deployndeliver-001-site1.btempurl.com/api`
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;