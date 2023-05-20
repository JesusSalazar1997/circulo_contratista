import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `http://deployndeliver-001-site1.btempurl.com/api`
})

export default clienteAxios;
