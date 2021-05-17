import axios from 'axios';

export const signup = async (body) => await axios.post('/auth/signup', body);
export const signin = async (body) => await axios.post('/auth/signin', body);