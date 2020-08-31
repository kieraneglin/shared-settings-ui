declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare interface VueInputEvent extends Event {
  target: HTMLInputElement
}

