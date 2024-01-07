import authorizedApiClient from './axios-instance'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getAll() {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/students`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      throw new Error('Get mahasiswa data failed')
    }
  } catch (error) {
    return console.error(error)
  }
}

async function getById(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/students/${id}`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      return response.data.message
    }
  } catch (error) {
    return console.error('Get data failed', error)
  }
}

async function addMhs(data) {
  try {
    const response = await authorizedApiClient.post(`${BASE_URL}/api/students`, data)
    if (response.status == 201) {
      const responseData = response.data.data
      return { data: responseData, message: response.data.message }
    } else {
      return response.data.message
    }
  } catch (error) {
    return console.error('Add mahasiswa failed', error)
  }
}

async function updateMhs(data) {
  try {
    const response = await authorizedApiClient.put(`${BASE_URL}/api/students/${data.id}`, data)
    if (response.status == 200) {
      const responseData = response.data.data
      return { data: responseData, message: response.data.message }
    } else {
      return response.data.message
    }
  } catch (error) {
    return console.error('Update mahasiswa failed', error)
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
    return console.error('Failed delete mahasiswa data', error)
  }
}

async function getAvailableMatkul(id) {
  try {
    const response = await authorizedApiClient.get(`${BASE_URL}/api/available-subjects/${id}`)
    if (response.status == 200) {
      const responseData = response.data.data
      return responseData
    } else {
      return response.data.error
    }
  } catch (error) {
    return console.error('Get available matkul failed', error)
  }
}

export { getAll, getById, deleteMhs, addMhs, updateMhs, getAvailableMatkul }
