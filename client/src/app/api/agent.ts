import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/'
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/id?id=${id}`)
}

const Cart = {
    get: () => requests.get('Cart'),
    addItem: (productId: number, quantity = 1) => requests.post(`Cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`Cart?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    Cart
}



export default agent;