<template>
  <LayoutAdmin :selected="selected" :pageName="pageName" :filters="filters" class="page-users">
    <button @click="filterTable('?state=active')">Ấn vào đây để lọc mẫu</button>
    <div class="main">
      <Block blockName="Table Users">
        <Table
          :data="users"
          :columns="columns"
          :is-router-link="true"
          :router-builder="'/dashboard/users/#{uid}'"
          :loading="loading"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { Align, Column, User, Filter, UserRole, UserState } from '~/types'

@Component({
  middleware: ['check', 'notLogged'],
})
export default class Admin extends Vue {
  head() {
    return {
      title: 'Users',
    }
  }

  filters: Filter[] = [
    {
      id: 1,
      default: UserRole.Member,
      type: UserRole,
      title: 'Role',
      transform: 'dropdown'
    },
    {
      id: 2,
      default: UserState.Pending,
      type: UserState,
      title: 'State',
      transform: 'dropdown'
    }
  ]

  columns: Column[] = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,
    },
    {
      key: 'first_name',
      title: 'First name',
      align: Align.Left,
    },
    {
      key: 'last_name',
      title: 'Last name',
      align: Align.Left,
    },
    {
      key: 'email',
      title: 'Email',
      align: Align.Left,
    },
    {
      key: 'state',
      title: 'State',
      align: Align.Left,
    },
    {
      key: 'role',
      title: 'Role',
      align: Align.Left,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Left,
    },
  ]

  users: User[] = []

  loading = true;
  selected: number = 2
  pageName: string = 'Users'

  get params() {
    const url = this.$route.fullPath;
    const position = url.indexOf('?');
    if(position === -1) {
      return ''
    } else {
      return url.slice(position);
    }
  }

  asyncData ({ $axios }: Context) {
    try{
      return $axios.get(`http://localhost:3000/api/v2/admin/users`).then(res => {
          // this.loading = false;

          res.data.forEach( (user:User) => {
            const x = this.formatDateData(user.created_at);
            user.created_at = x;
          });
          return {
            users: res.data
          }
      })
    } catch(error) {
      return error;
    }
  }

  // async fetch() {
  //   try {
  //     const { data } = await this.$axios.get(`http://localhost:3000/api/v2/admin/users${this.params}`);

  //     this.users = data;
  //     this.loading = false;

  //     this.users.forEach( (user) => {
  //       const x = this.formatDateData(user.created_at);
  //       user.created_at = x;
  //     });
  //   } catch (error) {
  //     return error
  //   }
  // }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').join('/');
  }
}
</script>

<style lang="less">
.id{
  min-width: 80px;
}

.first_name{
  min-width: 120px;
}

.last_name{
  min-width: 120px;
}

.email{
  min-width: 350px;
}

.state{
  flex: 1;
}

.role{
  flex: 1;
}

.created_at{
  flex: 1;
}
</style>
