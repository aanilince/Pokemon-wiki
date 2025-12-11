import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getPokemonDetail = async (nameOrId) => {
  const response = await api.get(`/pokemon/${nameOrId}`);
  return response.data;
};

export const getItemsList = async (limit = 20, offset = 0) => {
  const response = await api.get(`/item?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getTypeList = async () => {
  const response = await api.get('/type');
  return response.data;
};

export const getPokemonByType = async (type) => {
  const response = await api.get(`/type/${type}`);
  return response.data;
};

export default api;
