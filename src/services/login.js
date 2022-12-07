import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginData) => {
  const response = await axios.post(baseUrl, loginData)
  return response.data
}

const logout = () => {
  localStorage.removeItem('loginJSON')// eslint-disable-line
}
const exportedObject = {
  login,
  logout
}

export default exportedObject
