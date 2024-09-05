import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

export const update = async (updateBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const id = updateBlog.id;
  console.log(updateBlog);
  const blogUpdate = updateBlog.blog;
  console.log(id);
  console.log(blogUpdate);
  const request = await axios.put(`${baseUrl}/${id}`, blogUpdate, config);
  return request.data;
};

export const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};
