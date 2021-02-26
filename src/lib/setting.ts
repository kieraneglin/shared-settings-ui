export interface Setting {
  name: string
  type: SettingType
  value: string
  encrypted: boolean
}

export type SettingType = 'string' | 'number' | 'boolean' | 'range'
