<template>
  <div class="flex justify-between">
    <input v-model="lowerBounds" class="input-base input-gray rounded py-2 px-2 w-1/3" type="number" />
    <span class="flex self-end mx-2">to</span>
    <input v-model="upperBounds" class="input-base input-gray rounded py-2 px-2 w-1/3" type="number" />
  </div>
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'

import { FormMixin } from './form-mixin'

@Component
export default class RangeForm extends FormMixin {
  public localValue = this.setting.value
  public lowerBounds = this.localValue.split(',')[0]
  public upperBounds = this.localValue.split(',')[1]

  get assembledRange() {
    return `${parseInt(this.lowerBounds)},${parseInt(this.upperBounds)}`
  }

  @Watch('setting', { deep: true })
  setLocalValue() {
    this.localValue = this.setting.value
  }

  @Watch('assembledRange')
  updateSetting() {
    this.$emit('update:setting', {
      ...this.setting,
      value: this.assembledRange
    })
  }
}
</script>
