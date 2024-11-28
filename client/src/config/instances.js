import axios from 'axios'

import { AUTH_API_URL, USER_API_URL } from '../helpers/constants.helper'

const createInstance = baseURL => {
  return axios.create({
    baseURL,
    withCredentials: true
  })
}

export const authInstance = createInstance(AUTH_API_URL)
export const userInstance = createInstance(USER_API_URL)
