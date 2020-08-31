export interface Setting {
  name: string
  type: SettingType
  value: string
}

export type SettingType = 'string' | 'number' | 'boolean' | 'range'
