<template>
  <div class="bg-white shadow-md rounded-lg px-4 py-6 mt-3 mx-4 md:mx-auto w-11/12 md:w-3/4 lg:w-1/2">
    <div class="flex justify-between items-center w-full">
      <div class="flex items-end">
        <h2 class="text-lg font-semibold text-gray-900">{{ localSetting.name }}</h2>
        <span class="text-gray-700 ml-2 text-sm">{{ localSetting.type }}</span>
        <span v-if="localSetting.encrypted" class="text-orange-600 ml-2 text-sm">(encrypted)</span>
      </div>
      <small @click="toggleOpen" class="text-sm text-gray-700 cursor-pointer">{{ toggleText }}</small>
    </div>
    <div v-if="open" class="mt-3">
      <div class="flex">
        <div class="flex items-center w-1/2">
          <component :is="formComponent" :setting.sync="localSetting" />
        </div>
        <div class="flex justify-end items-center w-1/2">
          <button @click="saveSetting" :disabled="clean" class="btn-base btn-blue-border py-2 px-4 rounded h-10">
            Save
          </button>
          <button @click="confirmDelete" class="btn-base btn-red-border py-2 px-4 ml-2 rounded h-10">
            Delete
          </button>
        </div>
      </div>
      <small class="text-gray-700" v-if="caveatText">{{ caveatText }}</small>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

import RangeForm from './forms/RangeForm.vue'
import NumberForm from './forms/NumberForm.vue'
import StringForm from './forms/StringForm.vue'
import BooleanForm from './forms/BooleanForm.vue'

@Component({
  components: {
    BooleanForm
  }
})
export default class SettingRow extends Vue {
  @Prop(Object) readonly setting!: Setting

  public open = false
  public localSetting: Setting = { ...this.setting }

  get toggleText() {
    return this.open ? 'Hide' : 'Show'
  }

  get clean() {
    return this.setting.value === this.localSetting.value
  }

  get caveatText() {
    if (this.setting.type === 'string') {
      return '* Value will be saved exactly as-is, including whitespace'
    }

    if (this.setting.type === 'range') {
      return '* Range values are inclusive'
    }

    return ''
  }

  get formComponent(): Vue.VueConstructor {
    const componentMap = {
      range: RangeForm,
      number: NumberForm,
      string: StringForm,
      boolean: BooleanForm
    }

    return componentMap[this.setting.type]
  }

  toggleOpen() {
    this.open = !this.open
  }

  confirmDelete() {
    if (confirm(`Click OK to permanently delete "${this.setting.name}"`)) {
      this.deleteSetting()
    }
  }

  @Emit('fetch-settings')
  async deleteSetting() {
    await fetch(`${this.$apiBase}/api/settings/${this.setting.name}/destroy`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.$root.$emit('launch-toast', {
      title: 'Success',
      body: 'Setting deleted'
    })
  }

  @Emit('fetch-settings')
  async saveSetting() {
    const { name, type, value } = this.localSetting

    await fetch(`${this.$apiBase}/api/settings/${name}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        value
      })
    })

    this.$root.$emit('launch-toast', {
      title: 'Success',
      body: 'Setting updated'
    })
  }
}
</script>
