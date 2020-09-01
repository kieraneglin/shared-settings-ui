<template>
  <div
    class="w-full lg:w-1/2 xl:w-1/3 absolute right-0 bottom-0 lg:mb-40 transition-opacity duration-200 ease-in-out"
    :class="opacity"
  >
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
      <p class="font-bold">{{ title }}</p>
      <p>{{ body }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { ToastParams } from '@/lib/toast'

@Component
export default class Toast extends Vue {
  public title = ''
  public body = ''
  public showToast = false

  get opacity() {
    return this.showToast ? 'opacity-100' : 'opacity-0'
  }

  created() {
    this.$root.$on('launch-toast', ({ title, body }: ToastParams) => {
      this.title = title
      this.body = body
      this.showToast = true

      setTimeout(() => {
        this.showToast = false
      }, 3000)
    })
  }
}
</script>
