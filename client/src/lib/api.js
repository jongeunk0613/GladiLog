import axios from 'axios';
axios.defaults.withCredentials = true

export const signup = async (data) => await axios.post('/auth/signup', data);
export const signin = async (data) => await axios.post('/auth/signin', data);
export const writePost = async (data) => await axios.post('/post/write', data);
export const getPosts = async () => await axios.get('/post/');