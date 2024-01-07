import authorizedApiClient from './axios-instance'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getAllMatKul() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/subjects`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      throw new Error('Get mata kuliah data failed')
    }
  } catch (error) {
    return console.error(error)
  }
}

async function getMatKulById(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/subjects/${id}`)
    if (response.status == 200) {
      return response.data.data
    } else {
      return response.data.message
    }
  } catch (error) {
    return console.error('Get data failed', error)
  }
}

async function addMatKul(data) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/subjects`, data)
    if (response.status == 201) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return console.error('Add mata kuliah failed', error)
  }
}

async function updateMatKul(data) {
  try {
    const response = await authorizedApiClient.put(`${BASE_URL}/api/subjects/${data.id}`, data)
    if (response.status == 200) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return console.error('Update mata kuliah failed', error)
  }
}

async function deleteMatKul(id) {
  try {
    const response = await authorizedApiClient.delete(`${BASE_URL}/api/subjects/${id}`)
    if (response.status == 200) {
      return response.data.message
    } else {
      return response.data.error
    }
  } catch (error) {
    return console.error(error)
  }
}

export { getAllMatKul, getMatKulById, addMatKul, updateMatKul, deleteMatKul }
