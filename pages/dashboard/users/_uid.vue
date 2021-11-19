<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <div class="main">
      <Block> 
        <UserDetail :user="user"/>
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang='ts'>
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

  selected = 2
  pageName = 'User Detail'
  user: any = null;

  async fetch() {
    try {
      const { data } = await this.$axios.get('http://localhost:3000/api/v2/admin/users');

      this.user = data.find((x:any) => {
        return x.uid === this.$route.params.uid;
      });

    } catch (error) {
      return error
    }
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').reverse().join('/');
  }
}
</script>