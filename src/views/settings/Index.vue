<template>
  <div class="home">
    <div v-for="setting in mockSettings" :key="setting.name">
      <span>{{ setting.name }} - {{ setting.value }}</span>
      <button @click="openSetting(setting)">View</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

@Component
export default class SettingsIndex extends Vue {
  public mockSettings: Setting[] = [
    {
      name: 'signup_enabled',
      type: 'boolean',
      value: '1'
    },
    {
      name: 'welcome_message',
      type: 'string',
      value: 'hey there!'
    }
  ]

  openSetting({ name }: Setting) {
    console.log(`Open ${name}`)
  }
}
</script>
