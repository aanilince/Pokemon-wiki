import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch paginated list of Pokemon
export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

// Fetch specific Pokemon data by name or ID
export const getPokemonDetail = async (nameOrId) => {
  const response = await api.get(`/pokemon/${nameOrId}`);
  return response.data;
};

// Fetch paginated list of Items
export const getItemsList = async (limit = 20, offset = 0) => {
  const response = await api.get(`/item?limit=${limit}&offset=${offset}`);
  return response.data;
};

// Fetch item details
export const getItemDetail = async (nameOrId) => {
  const response = await api.get(`/item/${nameOrId}`);
  return response.data;
};

// Fetch all available Pokemon types
export const getTypeList = async () => {
  const response = await api.get('/type');
  return response.data;
};

// Fetch all Pokemon belonging to a specific type
export const getPokemonByType = async (type) => {
  const response = await api.get(`/type/${type}`);
  return response.data;
};

// Fetch species data (flavor text, evolution chain url, etc.)
export const getPokemonSpecies = async (nameOrId) => {
    const response = await api.get(`/pokemon-species/${nameOrId}`);
    return response.data;
};

export default api;
