<template>
  <LayoutAdmin :selected="selected" :pageName="pageName" :drawer="true" :filters="filters">
    <div class="main">
      <Block class="musics" blockName="Table Musics">
        <Table
          :data="musics"
          :columns="columns"
          :is-router-link="true"
          :router-builder="'/dashboard/musics/#{id}'"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import ApiClient from '@/library/ApiClient';
import { Align, Column, Music, Filter, MusicState } from '@/types'

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
      title: 'Musics',
    }
  }

  filters: Filter[] = [
    {
      id: 1,
      default: '',
      type: String,
      title: 'UID',
      transform: 'text'
    },
    {
      id: 2,
      default: '',
      type: MusicState,
      title: 'State',
      transform: 'dropdown'
    },
    {
      id: 3,
      default: '',
      type: String,
      title: 'Name',
      transform: 'text'
    },
    {
      id: 4,
      default: '',
      type: String,
      title: 'Author',
      transform: 'text'
    },
  ]

  columns: Column[] = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,  
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'author',
      title: 'Author',
      align: Align.Left,
    },
    {
      key: 'state',
      title: 'State',
      align: Align.Left,
    },
    {
      key: 'created_at',
      title: 'Created at',
      align: Align.Right
    }
  ]

  musics: Music[] = []

  selected: number = 3
  pageName: string = 'Musics'

  async asyncData ({ $axios, route }: Context) {
    try{
      const { data } = await new ApiClient($axios).get(`admin/musics${handleUrl(route.fullPath)}`);

      data.forEach( (user:Music) => {
        const x = user.created_at.split('T')[0].split('-').join('/');
        user.created_at = x;
      });
      return {
        musics: data
      }
    } catch(error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.musics{
  .id{
    flex: 0 0 80px;
  }
  
  .name{
    flex: 1;
  }
  
  .author{
    flex: 1;
  }
  
  .state{
    flex: 0 0 150px;
  }
  
  .created_at{
    flex: 0 0 150px;
  }
}
</style>
