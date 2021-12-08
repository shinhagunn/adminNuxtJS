<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <div class="main">
      <Block> 
        <CommentDetail :comment="comment"/>
      </Block>

      <Block class="comments" blockName="List replies">
        <Table
          :data="(comment.replies === undefined) ? [] : comment.replies"
          :columns="columns"
          :is-router-link="false"
          :router-builder="'/dashboard/comments/#{id}'"
          @handleActionRemove="handleActionRemove"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang='ts'>
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator'
import ZNotification from '@/library/z-notification'
import ApiClient from '~/library/ApiClient';
import { Align, Column, Reply } from '~/types';

@Component({
  middleware: ['check', 'notLogged'],
})
export default class Uid extends Vue {
  head() {
    return {
      title: 'Comment Detail',
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
    },
    {
      key: 'action-remove',
      title: 'Action',
      align: Align.Center,
    }
  ]

  selected = 4
  pageName = 'Comment Detail'
  comment: any = null;

  async handleActionRemove(id: number) {
    try {
      await new ApiClient().delete(`admin/comments/reply/${id}`);

      ZNotification.success({
          title: "Success",
          description: "Remove reply successfully"
      })

      const index = this.comment.replies.findIndex((reply: Reply) => {
        return reply.id === id;
      })
      if(index === -1) {
        return
      }
      this.comment.replies.splice(index, 1);
    } catch(error) {
      return error
    }
  }

  async asyncData ({ params, $axios }: Context) {
    const [myComment] = await Promise.all([
      new ApiClient($axios).get(`admin/comments/${params.id}`)
    ])

    myComment.data.created_at = myComment.data.created_at.split('T')[0].split('-').join('/');

    if(myComment.data.replies !== undefined) {
      myComment.data.replies.forEach( (reply: Reply) => {
        const x = reply.created_at.split('T')[0].split('-').join('/');
        reply.created_at = x;
      });
    }

    return {
      comment: myComment.data
    }
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

.action{
  max-width: 150px;
}
</style>