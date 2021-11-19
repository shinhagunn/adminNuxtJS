<template>
  <div class="layout-default">
    <Nuxt />
    <ZNotificationGroup ref="z-notification-group" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({})
export default class DefaultLayout extends Vue {
}
</script>