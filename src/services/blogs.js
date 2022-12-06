import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (data) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const update = async (data) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${data.id}`, data, config)
  return response.data  
}

const remove = async (data) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${data.id}`, config)
  return response.status  
}

const exportedObject = {
  setToken,
  getAll,
  create,
  update,
  remove,
  getUsers
}

export default exportedObject