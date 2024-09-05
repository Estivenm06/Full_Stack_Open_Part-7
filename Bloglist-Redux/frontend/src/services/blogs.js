import axios from "axios";
import { json } from "react-router-dom";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const update = async (id, newObjects) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(newObjects);
  const request = await axios.put(`${baseUrl}/${id}`, newObjects, config);
  return request.data;
};

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id.idBlog}`, config);
  return request.data;
};

const comment = async (id, content) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, {content})
    return request.data
}

const getComments = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}/comments`)
    return request.data
}

export default { getAll, create, update, del, setToken, comment, getComments };
