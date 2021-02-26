<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-48 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="inline-block align-middle h-screen"></span>&#8203;

      <div class="modal-base my-8 align-middle max-w-lg w-full">
        <div class="bg-white px-4 py-5 pb-4">
          <div class="flex items-start">
            <div class="mt-0 text-left w-full">
              <h3 class="text-xl leading-6 font-medium text-gray-900">
                Create setting
              </h3>
              <div class="mt-6">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    v-model="name"
                    class="input-base input-gray rounded py-2 px-2 w-full"
                    placeholder="my_setting"
                  />
                  <p class="text-gray-700 text-xs">Letters, numbers, and underscores only. snake_case preferred.</p>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Type
                  </label>
                  <div class="relative">
                    <select v-model="type" class="select-base select-gray w-full pr-6 rounded py-2 px-2">
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="range">Range</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Value
                  </label>
                  <div class="w-full">
                    <component :is="formComponent" :setting.sync="assembledSetting" />
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Encrypt?
                    <input v-model="encrypted" type="checkbox" class="ml-2" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 mb-3 flex justify-end">
          <span class="rounded-md shadow-sm w-auto">
            <button @click="closeModal" type="button" class="btn-base btn-gray-border py-2 px-4 rounded h-10">
              Cancel
            </button>
          </span>
          <span class="rounded-md shadow-sm w-auto ml-3">
            <button
              @click="createSetting"
              :disabled="!settingValid"
              type="button"
              class="btn-base btn-blue-border py-2 px-4 rounded h-10"
            >
              Create
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

import { Setting, SettingType } from '@/lib/setting'

import RangeForm from './forms/RangeForm.vue'
import NumberForm from './forms/NumberForm.vue'
import StringForm from './forms/StringForm.vue'
import BooleanForm from './forms/BooleanForm.vue'

@Component({
  components: {
    StringForm
  }
})
export default class NewSettingModal extends Vue {
  public name = ''
  public type: SettingType = 'string'
  public value = ''
  public encrypted = false

  get formComponent(): Vue.VueConstructor {
    const componentMap = {
      range: RangeForm,
      number: NumberForm,
      string: StringForm,
      boolean: BooleanForm
    }

    return componentMap[this.type]
  }

  get settingValid() {
    return !!this.name.length && /^\w+$/.test(this.name)
  }

  get assembledSetting(): Setting {
    return {
      name: this.name,
      type: this.type,
      value: this.value,
      encrypted: this.encrypted
    }
  }

  set assembledSetting({ value }: Setting) {
    this.value = value
  }

  closeModal() {
    this.$emit('close-modal')
  }

  @Watch('type')
  setDefaultValue() {
    const defaultValueMap = {
      range: '0,1',
      number: '1',
      string: '',
      boolean: '1'
    }

    this.value = defaultValueMap[this.type]
  }

  async createSetting() {
    const { name, type, value, encrypted } = this.assembledSetting

    await fetch(`${this.$apiBase}/api/settings`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        type,
        value,
        encrypted
      })
    })

    this.$emit('close-modal')
    this.$emit('fetch-settings')

    this.$root.$emit('launch-toast', {
      title: 'Success',
      body: 'Setting created'
    })
  }
}
</script>
