<template>
  <div>
    <h2>{{ setting.name }}</h2>
    <h2>{{ setting.value }}</h2>
    <boolean-form :setting.sync="setting" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

import BooleanForm from './components/BooleanForm.vue'

@Component({
  components: {
    BooleanForm
  }
})
export default class SettingsShow extends Vue {
  public setting: Setting = {
    name: 'signup_enabled',
    type: 'boolean',
    value: '1'
  }
}
</script>
