<template>
  <div class="bg-white shadow-md rounded-lg px-4 py-6 mt-3 mx-4 md:mx-auto w-1/2">
    <div class="flex justify-between w-full">
      <div class="flex">
        <h2 class="text-lg font-semibold text-gray-900 -mt-1">{{ localSetting.name }}</h2>
        <span class="text-gray-700 ml-2">{{ localSetting.type }}</span>
      </div>
      <small @click="toggleOpen" class="text-sm text-gray-700 cursor-pointer">{{ toggleText }}</small>
    </div>
    <div v-if="open" class="mt-3">
      <div class="flex">
        <div class="flex items-center w-1/2">
          <p class="text-gray-900 mr-2">Value:</p>
          <component :is="formComponent" :setting.sync="localSetting" />
        </div>
        <div class="flex justify-end items-center w-1/2">
          <button @click="saveSetting" :disabled="clean" class="btn-base btn-blue-border py-2 px-4 rounded h-10">
            Save
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

  public open = !false
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

  get formComponent(): typeof Vue {
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

  @Emit('fetch-settings')
  async saveSetting() {
    const { name, type, value } = this.localSetting

    await fetch(`${this.$apiHost}/api/settings/${name}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        value
      })
    })

    console.log('Setting saved - TODO: add feedback to user')
  }
}
</script>
