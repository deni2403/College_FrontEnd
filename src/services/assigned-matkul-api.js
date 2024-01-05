import authorizedApiClient from './axios-instance'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getAllAssigned() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/students_subjects`)
    const responseData = response.data.data
    return responseData
  } catch (error) {
    return error
  }
}

async function assignMatKul(data) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/students_subjects`, data)
    if (response.status == 200) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return error
  }
}

async function deleteAssigned(id) {
  try {
    const response = await authorizedApiClient.delete(`${BASE_URL}/api/students_subjects/${id}`)
    if (response.status == 200) {
      return response.data.message
    } else {
      return response.data.error
    }
  } catch (error) {
    return error
  }
}

export { getAllAssigned, assignMatKul, deleteAssigned }
