import { type WayToGetCode } from './enter-code.types'

export const waysToGetCode: WayToGetCode[] = [
  { value: 'whatsapp', name: 'Whatsapp' },
  { value: 'sms', name: 'Sms' }
]

export const defaultWayToGetCode: WayToGetCode = { value: 'whatsapp', name: 'Whatsapp' }
