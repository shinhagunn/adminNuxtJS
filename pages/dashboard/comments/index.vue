<template>
  <LayoutAdmin :selected="selected" :pageName="pageName" :drawer="true" :filters="filters">
    <div class="main">
      <Block class="comments" blockName="Table Comments">
        <Table
          :data="comments"
          :columns="columns"
          :is-router-link="true"
          :router-builder="'/dashboard/comments/#{id}'"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import ApiClient from '@/library/ApiClient';
import { Align, Column, Music, Filter, Comment } from '@/types'

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
      title: 'Comments',
    }
  }

  filters: Filter[] = [
    {
      id: 1,
      default: '',
      type: String,
      title: 'Album_ID',
      transform: 'text'
    },
    {
      id: 2,
      default: '',
      type: String,
      title: 'Music_ID',
      transform: 'text'
    },
    {
      id: 3,
      default: '',
      type: String,
      title: 'Content',
      transform: 'text'
    },
    {
      id: 4,
      default: '',
      type: String,
      title: 'User_UID',
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
      key: 'user_uid',
      title: 'User UID',
      align: Align.Left,
    },
    {
      key: 'content',
      title: 'Content',
      align: Align.Left,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Right,
    }
  ]

  comment: Music[] = []

  selected: number = 4
  pageName: string = 'Comments'

  async asyncData ({ $axios, route }: Context) {
    try{
      const { data } = await new ApiClient($axios).get(`admin/comments${handleUrl(route.fullPath)}`);

      data.forEach( (comment:Comment) => {
        const x = comment.created_at.split('T')[0].split('-').join('/');
        comment.created_at = x;
      });
      return {
        comments: data
      }
    } catch(error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.comments {
  .id {
    flex: 0 0 80px;
  }
  
  .content {
    flex: 1;
  }
  
  .created_at {
    flex: 1;
  }
}
</style>
