<template>
  <nuxt-link v-if="isRouterLink" :to="to" class="a-table-row">
    <slot></slot>
  </nuxt-link>
  <div v-else class="a-table-row">
    <slot />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class TableRow extends Vue {
  @Prop() readonly isRouterLink!: boolean
  @Prop() readonly to!: string
}
</script>
