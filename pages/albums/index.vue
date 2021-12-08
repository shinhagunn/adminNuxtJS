<template>
  <LayoutAdmin :selected="selected" :pageName="pageName" :drawer="true" :filters="filters">
    <div class="main">
      <Block class="albums" blockName="Table Albums">
        <Table
          :data="albums"
          :columns="columns"
          :is-router-link="true"
          :router-builder="'/albums/#{id}'"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import ApiClient from '@/library/ApiClient';
import { Align, Column, Filter, Album } from '@/types'

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
      title: 'Albums',
    }
  }

  filters: Filter[] = [
    {
      id: 1,
      default: '',
      type: String,
      title: 'Name',
      transform: 'text'
    },
    {
      id: 2,
      default: '',
      type: String,
      title: 'UID',
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
      key: 'user_uid',
      title: 'User UID',
      align: Align.Left,
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'view_count',
      title: 'View count',
      align: Align.Center,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Right,
    }
  ]

  albums: Album[] = []

  selected: number = 5
  pageName: string = 'Albums'

  async asyncData ({ $axios, route }: Context) {
    try{
      const { data } = await new ApiClient($axios).get(`admin/albums${handleUrl(route.fullPath)}`);

      data.forEach( (album:Album) => {
        const x = album.created_at.split('T')[0].split('-').join('/');
        album.created_at = x;
      });
      return {
        albums: data
      }
    } catch(error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.albums {
  .id {
    flex: 0 0 80px;
  }

  .user_uid{
    flex: 0 0 200px;
  }
  
  .name {
    flex: 1;
  }

  .view_count {
    flex: 0 0 150px;
  }
  
  .created_at {
    flex: 0 0 200px;
  }
}
</style>
