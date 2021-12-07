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

<style lang="less">
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
  
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 4px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>