import axios from 'axios';

// const url = 'https://my-project888.herokuapp.com/posts';
const url = "http://localhost:5001/posts"
const API = axios.create({ baseURL: url });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        var email = JSON.parse(localStorage.getItem('profile')).email;
        var password = JSON.parse(localStorage.getItem('profile')).password;
        console.log(email+password);
      req.headers.Authorization = `${email} ${password}`;
    }
  
    return req;
  });


export const fetchPosts = () => API.get('/');

export const createPost = (newPost) => API.post('/',newPost);
export const authLogin = (newPost) => axios.post("http://localhost:5001/posts/login",newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id.id}/likePost`,id);
export const reallLogin = (data) =>axios.post('http://localhost:5001/posts/creat',data);
