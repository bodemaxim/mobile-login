export type CreateSessionResponse = {
  success: boolean
  data: ResponseData
}

export type SendResponse = {
  success: boolean
  data: SessionData
}

export type CheckCodeResponse = {
  success: boolean
  data: {
    verify_token: string
  }
}

export type ClientChannel = {
  name: string
  type: string
  is_active: boolean
  timeout: number
  description: string
  image_url: string
  link: string
  sorting: number
}

export type ResponseData = {
  session_id: string
  sent_to: string
  client_channels: ClientChannel[]
}

export type SessionData = {
  session_id: string
  client_channel: ClientChannel
}
