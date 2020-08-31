<template>
  <div>
    {{ mockSetting }}
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

@Component
export default class SettingsShow extends Vue {
  public mockSetting: Setting = {
    name: 'signup_enabled',
    type: 'boolean',
    value: '1'
  }
}
</script>
