<template>
  <LayoutAdmin :selected="selected" :pageName="pageName" :drawer="true" :filters="filters" class="page-users">
    <div class="main">
      <Block class="users" blockName="Table Users" >
        <Table
          :data="users"
          :columns="columns"
          :is-router-link="true"
          :router-builder="'/dashboard/users/#{uid}'"
          :onPagination="onPagination" 
          :quantityRowPerPage="quantityRowPerPage" 
        >
          <!-- <Pagination v-if="onPagination" :quantityRowPerPage="quantityRowPerPage" :dataLength="users.length"/> -->
        </Table>
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { Align, Column, User, Filter, UserRole, UserState } from '~/types'

function handleUrl(url: string) {
  const position = url.indexOf('?');
  if(position === -1) {
    return ''
  } else {
    return url.slice(position);
  }
}

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
      default: '',
      title: 'UID',
      transform: 'text'
    },
    {
      id: 2,
      default: '',
      type: UserRole,
      title: 'Role',
      transform: 'dropdown'
    },
    {
      id: 3,
      default: '',
      type: UserState,
      title: 'State',
      transform: 'dropdown'
    },
    {
      id: 4,
      default: '',
      title: 'Email',
      transform: 'text'
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
      key: 'uid',
      title: 'UID',
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
      align: Align.Right,
    },
  ]

  users: User[] = []

  selected: number = 2
  pageName: string = 'Users'
  onPagination = false;
  quantityRowPerPage = 5;

  get params() {
    const url = this.$route.fullPath;
    const position = url.indexOf('?');
    if(position === -1) {
      return ''
    } else {
      return url.slice(position);
    }
  }

  async asyncData ({ $axios, route }: Context) {
    try{
      const { data } = await $axios.get(`http://localhost:3000/api/v2/admin/users${handleUrl(route.fullPath)}`);

      data.forEach( (user:User) => {
        const x = user.created_at.split('T')[0].split('-').join('/');
        user.created_at = x;
      });
      return {
        users: data
      }
    } catch(error) {
      return error;
    }
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').join('/');
  }
}
</script>

<style lang="less">
.users {
  .id {
    flex: 0 0 80px;
  }
  
  .first_name {
    flex: 0 0 120px;
  }
  
  .last_name {
    flex: 0 0 120px;
  }
  
  .email {
    min-width: 350px;
  }

  .uid {
    flex: 1.5;
  }
  
  .state {
    flex: 1;
  }
  
  .role {
    flex: 1;
  }
  
  .created_at {
    flex: 1;
  }
}
</style>
