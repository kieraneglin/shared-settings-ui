<template>
  <div>
    <input v-model="localValue" class="input-base input-gray rounded w-1/2 py-2 px-2" type="text" />
  </div>
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'

import { FormMixin } from './form-mixin'

@Component
export default class NumberForm extends FormMixin {
  public localValue = this.setting.value

  get numberValid() {
    // isNaN accepts strings (and is a great way to test if a string fully represents a number)
    // however, TS doesn't believe me so we have to do some coersion weirdness
    return !isNaN((this.localValue as unknown) as number)
  }

  @Watch('setting', { deep: true })
  setLocalValue() {
    this.localValue = this.setting.value
  }

  @Watch('localValue')
  updateSetting() {
    if (this.numberValid) {
      this.$emit('update:setting', {
        ...this.setting,
        value: this.localValue
      })
    }
  }
}
</script>
