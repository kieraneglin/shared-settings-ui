<template>
  <div>
    <navbar />
    <div v-if="settings.length" class="flex flex-col items-center">
      <setting-row v-for="setting in settings" :key="setting.name" :setting="setting" @fetch-settings="fetchSettings" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

import Navbar from './components/Navbar.vue'
import SettingRow from './components/SettingRow.vue'

@Component({
  components: {
    Navbar,
    SettingRow
  }
})
export default class SettingsIndex extends Vue {
  public settings: Setting[] = []

  created() {
    this.fetchSettings()
  }

  async fetchSettings(): Promise<Setting[]> {
    const response = await fetch(`${this.$apiHost}/api/settings`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.settings = await response.json()

    return this.settings
  }
}
</script>
