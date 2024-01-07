import authorizedApiClient from './axios-instance'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getAllDosen() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/lecturers`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      throw new Error('Get dosen data failed')
    }
  } catch (error) {
    return console.error(error)
  }
}

async function getDosenById(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/lecturers/${id}`)
    if (response.status == 200) {
      return response.data.data
    } else {
      return response.data.message
    }
  } catch (error) {
    return console.error('Get data failed', error)
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
    return console.error('Add dosen failed', error)
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
    return console.error('Update dosen failed', error)
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
    return console.error('Delete dosen failed', error)
  }
}

async function getDosenWithoutMatKul() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/lecturers-without-subjects`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      throw new Error('Get dosen data failed')
    }
  } catch (error) {
    return console.error(error)
  }
}

export { getAllDosen, getDosenById, addDosen, updateDosen, deleteDosen, getDosenWithoutMatKul }
