import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './auth'

export const axiosConfig = {
  baseURL: '/api/v1/',
  headers: { Accept: 'application/json' }
}
export const unauthApi = axios.create(axiosConfig)

export const useConfig = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unauthApi.get('config')
        setData(response.data)
        setSuccess(true)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    fetchData()
  }, [])

  return { config: data, success, error }
}

export const useLogin = () => {
  const { setLoginResponse } = useAuth()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const login = async (user, password) => {
    setSuccess(false)
    setError(false)
    try {
      const response = await unauthApi.post('login', { user, password })
      setLoginResponse(response.data)
      setSuccess(true)
    } catch (error) {
      setError(error.response.statusText)
    }
  }

  return { login, success, error }
}

export const useRegisters = (api, viewName, deviceName) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`registers/${viewName}/${deviceName}.json`)
        setData(response.data)
        setSuccess(true)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    fetchData()
  }, [api, viewName, deviceName])

  return { registers: data, success, error }
}

export const useValues = (api, viewName, deviceName) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`values/${viewName}/${deviceName}.json`)
        setData(response.data)
        setSuccess(true)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    fetchData()
  }, [api, viewName, deviceName])

  return { values: data, success, error }
}
