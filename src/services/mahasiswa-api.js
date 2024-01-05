import authorizedApiClient from "./axios-instance"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getAll() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/students`)
    const responseData = response.data.data
    return responseData
  } catch (error) {
    return error
  }
}

async function getById(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/students/${id}`)
    if (response.status == 200) {
      return response.data.data
    } else {
      return response.data.error
    }
  } catch (error) {
    return error
  }
}

async function addMhs(data) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/students`, data)
    if (response.status == 200) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return error
  }
}

async function updateMhs(data) {
  try {
    const response = await authorizedApiClient.put(`${BASE_URL}/api/students/${data.id}`, data)
    if (response.status == 200) {
      return { data: response.data.data, message: response.data.message }
    } else {
      return { message: response.data.message }
    }
  } catch (error) {
    return error
  }
}

async function deleteMhs(id) {
  try {
    const response = await authorizedApiClient.delete(`${BASE_URL}/api/students/${id}`)
    if (response.status == 200) {
      return response.data.message
    } else {
      return response.data.error
    }
  } catch (error) {
    return error
  }
}

async function getAvailableMatkul(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/available-subjects/${id}`)
    const responseData = response.data.data
    return responseData
  } catch (error) {
    return error
  }
}

export { getAll, getById, deleteMhs, addMhs, updateMhs, getAvailableMatkul }
