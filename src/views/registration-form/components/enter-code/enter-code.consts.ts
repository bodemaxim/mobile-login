import { type WayToGetCode } from './enter-code.types'

export const waysToGetCode: WayToGetCode[] = [
  //{ value: 'telegram', name: 'Telegram' },
  { value: 'whatsapp', name: 'Whatsapp' },
  { value: 'sms', name: 'Sms' }
]

export const defaultWayToGetCode: WayToGetCode = { value: 'whatsapp', name: 'Whatsapp' }
