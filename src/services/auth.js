import authorizedApiClient from "./axios-instance"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function login(credentials) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/users/login`, credentials)
    const token = response.data.data.token
    localStorage.setItem('token', token)
    return token
  } catch (error) {
    return error
  }
}

async function registerUser(credentials) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/users`, credentials)
    return response.data.data
  } catch (error) {
    return error
  }
}

async function logout() {
  localStorage.removeItem('token')
}

async function getCurrentUser() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/users/current`);
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
}

async function isAuthenticated() {
  const token = localStorage.getItem('token')
  return !!token
}

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  registerUser
}
