<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <div class="main">
      <Block> 
        <MusicDetail :music="music"/>
      </Block>

      <Block class="comments" blockName="List comments">
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

<script lang='ts'>
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator'
import ApiClient from '@/library/ApiClient';
import { Align, Column, Comment } from '@/types';

@Component({
  middleware: ['check', 'notLogged'],
})
export default class Uid extends Vue {
  head() {
    return {
      title: 'Music Detail',
    }
  }

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

  selected = 3
  pageName = 'Music Detail'
  music: any = null;
  comments: any = null;

  async asyncData ({ params, $axios }: Context) {
    const [myMusic, myComments] = await Promise.all([
      new ApiClient($axios).get(`admin/musics/${params.id}`),
      new ApiClient($axios).get(`public/musics/${params.id}/comments`)
    ])

    myComments.data.forEach( (comment: Comment) => {
      const x = comment.created_at.split('T')[0].split('-').join('/');
      comment.created_at = x;
    });

    return {
      music: myMusic.data,
      comments: myComments.data
    }
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').reverse().join('/');
  }
}
</script>

<style lang="less">
.tabs{
  &-item{
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
    height: 100%;
    background-color: #fff;
    border: none;
  }

  &-item:hover{
    border-bottom: 2px solid black;
  }

  &-item-active{
    border-bottom: 2px solid black;
  }
}

.comments{
  .id {
    flex: 0 0 80px;
  } 

  .user_uid {
    flex: 0 0 200px;
  }
  
  .created_at {
    width: 200px;
  }
}
</style>