<template>
  <LayoutAdmin>
    <Block>
      <Table :data="users" :columns="columns" />
    </Block>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Align, Column } from '~/types'

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

@Component({
  middleware: 'auth'
})
export default class Admin extends Vue{
  columns: Column[] = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "first_name",
      title: "first_name",
      align: Align.Right,
    }
  ]

  users: User[] = [
    {
      id: 1,
      first_name: "Hà",
      last_name: "Hữu",
    }
  ]
}
</script>
