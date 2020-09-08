<template>
  <div>
    <navbar @create-new-setting="openNewSettingModal" />
    <new-setting-modal v-if="showNewSettingModal" @close-modal="closeNewSettingModal" @fetch-settings="fetchSettings" />
    <div v-if="settings.length" class="flex flex-col items-center mb-3">
      <setting-row v-for="setting in settings" :key="setting.name" :setting="setting" @fetch-settings="fetchSettings" />
    </div>
    <toast />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

import Toast from './components/Toast.vue'
import Navbar from './components/Navbar.vue'
import SettingRow from './components/SettingRow.vue'
import NewSettingModal from './components/NewSettingModal.vue'

@Component({
  components: {
    Toast,
    Navbar,
    SettingRow,
    NewSettingModal
  }
})
export default class SettingsIndex extends Vue {
  public settings: Setting[] = []
  public showNewSettingModal = false

  created() {
    this.fetchSettings()
  }

  openNewSettingModal() {
    this.showNewSettingModal = true
  }

  closeNewSettingModal() {
    this.showNewSettingModal = false
  }

  async fetchSettings(): Promise<Setting[]> {
    const response = await fetch(`${this.$apiBase}/api/settings`, {
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
