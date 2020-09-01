<template>
  <input
    v-model="localValue"
    class="input-base input-gray rounded w-full py-2 px-2"
    type="text"
    placeholder="[Insert text here]"
  />
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'

import { FormMixin } from './form-mixin'

@Component
export default class StringForm extends FormMixin {
  public localValue = this.setting.value

  @Watch('setting', { deep: true })
  setLocalValue() {
    this.localValue = this.setting.value
  }

  @Watch('localValue')
  updateSetting() {
    this.$emit('update:setting', {
      ...this.setting,
      value: this.localValue
    })
  }
}
</script>
