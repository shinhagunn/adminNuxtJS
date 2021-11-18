<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <LoadingAnim/>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: ['check', 'notLogged']
})
export default class Admin extends Vue{
  head(){
    return {
      title: 'Dashboard'
    }
  }

  selected: number = 1;
  pageName: string = 'Dashboard';
}
</script>
