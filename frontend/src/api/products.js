import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getProducts = (category) =>
    API.get('/products', { params: category && category !== 'tous' ? { category } : {} }).then((r) => r.data);

export const getProduct = (id) =>
    API.get(`/products/${id}`).then((r) => r.data);

export const getCategories = () =>
    API.get('/categories').then((r) => r.data);
