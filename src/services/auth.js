import authorizedApiClient from './axios-instance'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function login(credentials) {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/users/login`, credentials)
    if (response.status == 200) {
      const responseData = response.data.data
      const token = responseData.token
      localStorage.setItem('token', token)
      return token
    } else {
      return response.data.errors.message
    }
}

async function registerUser(credentials) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/users`, credentials)
    if (response == 201) {
      const responseData = response.data.data
      return responseData
    } else {
      throw new Error('Registration failed')
    }
  } catch (error) {
    console.error(error)
  }
}

async function logout() {
  try {
    const response = await authorizedApiClient.delete(`${BASE_URL}/api/users/logout`)
    if (response.status == 200) {
      localStorage.removeItem('token')
    } else {
      throw new Error('Logout failed')
    }
  } catch (error) {
    console.error(error)
  }
}

async function getCurrentUser() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/users/current`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      throw new Error('Get current user failed')
    }
  } catch (error) {
    return console.error(error)
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
