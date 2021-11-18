<template>
  <LayoutAdmin :selected="selected" :pageName="pageName" class="page-users">
    <Block blockName="Table Users">
      <Table
        :data="users"
        :columns="columns"
        :is-router-link="true"
        :router-builder="'/dashboard/users/#{uid}'"
      />
    </Block>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Align, Column, User, ModeTable } from '~/types'

@Component({
  middleware: ['check', 'notLogged'],
})
export default class Admin extends Vue {
  head() {
    return {
      title: 'Users',
    }
  }

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

  selected: number = 2
  pageName: string = 'Users'
  modeTable = ModeTable.Link

  async fetch() {
    try {
      const { data } = await this.$axios.get('http://localhost:3000/api/v2/admin/users');

      this.users = data;

      this.users.forEach( (user) => {
        const x = this.formatDateData(user.created_at);
        user.created_at = x;
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
