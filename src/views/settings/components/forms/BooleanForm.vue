<template>
  <div class="relative">
    <select :value="setting.value" @input="updateSetting" class="select-base text-gray-900 w-full pr-6 rounded">
      <option value="1">true</option>
      <option value="0">false</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Emit } from 'vue-property-decorator'

import { FormMixin } from './form-mixin'

@Component
export default class BooleanForm extends FormMixin {
  @Emit('update:setting')
  updateSetting({ target }: VueInputEvent) {
    return {
      ...this.setting,
      value: target.value
    }
  }
}
</script>
