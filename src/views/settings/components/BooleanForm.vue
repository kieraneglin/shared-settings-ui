<template>
  <div>
    <select :value="setting.value" @input="settingChanged">
      <option value="1">true</option>
      <option value="0">false</option>
    </select>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

@Component
export default class BooleanForm extends Vue {
  @Prop(Object) readonly setting!: Setting

  @Emit('update:setting')
  settingChanged({ target }: VueInputEvent) {
    return {
      ...this.setting,
      value: target.value
    }
  }
}
</script>
