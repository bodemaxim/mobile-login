import axios from 'axios'
import type { CreateSessionResponse, SendResponse, CheckCodeResponse } from './types'

const kodMobiApiKey: string = import.meta.env.VITE_KOD_MOBI_API_KEY

export const createSession = async (phone: string): Promise<CreateSessionResponse | null> => {
  try {
    const response = await axios.get(`https://api.kod.mobi/api/v1/message/create?phone=${phone}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': kodMobiApiKey
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message)
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
    } else {
      console.error('Unexpected error:', error)
    }
    return null
  }
}

export const sendCode = async (
  sessionId: string,
  type: 'telegram' | 'whatsapp' | 'sms'
): Promise<SendResponse | null> => {
  try {
    const response = await axios.get(
      `https://api.kod.mobi/api/v1/message/send?session_id=${sessionId}&type=${type}&lang=ru`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': kodMobiApiKey
        }
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message)
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
    } else {
      console.error('Unexpected error:', error)
    }
    return null
  }
}

export const checkCode = async (
  sessionId: string,
  code: string
): Promise<CheckCodeResponse | null> => {
  console.debug('checkCode params', sessionId, code)

  axios
    .get(`https://api.kod.mobi/api/v1/message/check?session_id=${sessionId}&code=${code}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': kodMobiApiKey
      }
    })
    .then((response) => {
      console.log('verify_token:', response.data.data.verify_token)
      return response.data
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message)
        if (error.response) {
          console.error('Response data:', error.response.data)
        }
      } else {
        console.error('Unexpected error:', error)
      }
    })
  return null
}
