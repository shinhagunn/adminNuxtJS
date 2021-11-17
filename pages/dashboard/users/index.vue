<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <Block blockName="Table Users">
      <Table :data="users" :columns="columns" :modeTable="modeTable"/>
    </Block>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Align, Column, User, UserRole, UserState, ModeTable } from '~/types'

@Component({
  middleware: ['check', 'notLogged']
})
export default class Admin extends Vue{
  head(){
    return {
      title: 'Users'
    }
  }

  columns: Column[] = [
    {
      key: "id",
      title: "ID",
      align: Align.Left,
    },
    {
      key: "first_name",
      title: "First name",
      align: Align.Left,
    },
    {
      key: "last_name",
      title: "Last name",
      align: Align.Left,
    },
    {
      key: "email",
      title: "Email",
      align: Align.Left,
    },
    {
      key: "state",
      title: "State",
      align: Align.Left,
    },
    {
      key: "role",
      title: "Role",
      align: Align.Left,
    },
    {
      key: "created_at",
      title: "Created At",
      align: Align.Left,
    }
  ]

  users: User[] = [
    {
      id: 1,
      uid: "UID1786598252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha1",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },
    {
      id: 2,
      uid: "UID1786592352",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha2",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },
    {
      id: 3,
      uid: "UID1782398252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha3",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },
    {
      id: 4,
      uid: "UID17861298252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha4",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 5,
      uid: "UID1784598452",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha5",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 6,
      uid: "UID1781638252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha6",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 7,
      uid: "UID1761638252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha7",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 8,
      uid: "UID1786037259",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha8",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 9,
      uid: "UID1116598252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha9",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 10,
      uid: "UID1706598252",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha10",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    },{
      id: 11,
      uid: "UID1740659852",
      email: "asadsadad@incoware.com",
      first_name: "Huu",
      last_name: "Ha11",
      bio: "cxzc", // | null
      state: UserState.Active, // active | pending | banned | deleted
      role: UserRole.Admin, // admin | member
      created_at: "2021-11-16T05:37:44.182Z",
      updated_at: "2021-11-16T05:37:44.182Z"
    }
  ]

  selected: number = 2;
  pageName: string = 'Users';
  modeTable = ModeTable.Link;
}
</script>
