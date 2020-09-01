import { Component, Prop, Vue } from 'vue-property-decorator'

import { Setting } from '@/lib/setting'

@Component
export class FormMixin extends Vue {
  @Prop(Object) readonly setting!: Setting
}
