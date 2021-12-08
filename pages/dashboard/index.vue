<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: ['check', 'notLogged', 'login']
})
export default class dashboard extends Vue{
  head(){
    return {
      title: 'Dashboard'
    }
  }
}
</script>
