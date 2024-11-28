import { userInstance } from '../../config/instances'

const getInfoUserRequest = async () => {
  try {
    const response = await userInstance.get('/info-user')
    return response.data
  } catch (error) {
    throw new Error(`${error.response.data.message}`)
  }
}

const updateAccountRequest = async data => {
  try {
    const response = await userInstance.put('/change-info', data)
    return response.data
  } catch (error) {
    throw new Error(`${error.response.data.message}`)
  }
}

const updatePasswordRequest = async data => {
  console.log(data)
  try {
    const response = await userInstance.put('/change-password', data)
    return response.data
  } catch (error) {
    throw new Error(`${error.response.data.message}`)
  }
}

export { getInfoUserRequest, updateAccountRequest, updatePasswordRequest }
