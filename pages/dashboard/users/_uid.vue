<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <Block> 
      <UserDetail/>
    </Block>

    <Block> 
      
    </Block>
  </LayoutAdmin>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: ['check', 'notLogged'],
})
export default class Uid extends Vue {
  head() {
    return {
      title: 'User Detail',
    }
  }

  uid = this.$route.params

  selected = 2
  pageName = 'User Detail'
}
</script>