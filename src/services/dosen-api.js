import authorizedApiClient from './axios-instance'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getAllDosen() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/lecturers`)
    const responseData = response.data.data
    return responseData
  } catch (error) {
    return error
  }
}

async function getDosenById(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/lecturers/${id}`)
    if (response.status == 200) {
      return response.data.data
    } else {
      return response.data.error
    }
  } catch (error) {
    return error
  }
}

async function getDosenWithoutMatKul() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/lecturers-without-subjects`)
    const responseData = response.data.data
    return responseData
  } catch (error) {
    return error
  }
}

async function addDosen(data) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/lecturers`, data)
    if (response.status == 200) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return error
  }
}

async function updateDosen(data) {
  try {
    const response = await authorizedApiClient.put(`${BASE_URL}/api/lecturers/${data.id}`, data)
    if (response.status == 200) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return error
  }
}

async function deleteDosen(id) {
  try {
    const response = await authorizedApiClient.delete(`${BASE_URL}/api/lecturers/${id}`)
    if (response.status == 200) {
      return response.data.message
    } else {
      return response.data.error
    }
  } catch (error) {
    return error
  }
}

export { getAllDosen, getDosenById, addDosen, updateDosen, deleteDosen, getDosenWithoutMatKul }
