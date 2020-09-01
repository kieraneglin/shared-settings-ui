<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Shared Settings</span>
    </div>
    <div class="flex justify-end">
      <span @click="openSettingForm" class="btn-base rounded btn-white-border text-sm px-4 py-2 hover:text-teal-500">
        New Setting
      </span>
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  openSettingForm() {
    console.log('TODO - setting form')
  }
}
</script>
