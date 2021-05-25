import axios from 'axios';
axios.defaults.withCredentials = true

export const signup = async (data) => await axios.post('/auth/signup', data);
export const signin = async (data) => await axios.post('/auth/signin', data);
export const logout = async () => await axios.post('/auth/logout');
export const writePost = async (data) => await axios.post('/post/write', data);
export const getPosts = async () => await axios.get('/post/');
export const getPost = async (id) => await axios.get(`/post/${id}`);
export const deletePost = async (id) => await axios.delete(`/post/delete/${id}`);
export const updatePost = async (id, data) => await axios.patch(`/post/edit/${id}`, data);
export const createComment = async (id, data) => await axios.post(`/comment/create/${id}`, data);
export const getComments = async (id) => await axios.get(`/comment/get?postID=${id}`);
export const deleteComment = async (id) => await axios.delete(`/comment/delete/${id}`);
export const getComment = async (id) => await axios.get(`/comment/${id}`);
export const updateComment = async(id, data) => await axios.patch(`/comment/edit/${id}`, data);