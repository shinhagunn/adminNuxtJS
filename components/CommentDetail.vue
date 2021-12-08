<template>
  <div class="container-comment">
    <div class="row">
      <div class="col-4">
        <span class="title">ID</span>
      </div>
      <div class="col-4">
        <span class="title">User UID</span>
      </div>
      <div class="col-4">
        <span class="title">Created At</span>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <p class="music-infor">{{comment.id}}</p>
      </div>
      <div class="col-4">
        <p class="music-infor">{{ comment.user_uid }}</p>
      </div>

      <div class="col-4">
        <p class="music-infor">{{ comment.created_at }}</p>
      </div>
    </div>

    <div class="row">
        <span class="title">Content</span>
    </div>

    <div class="row">
        <p class="music-infor">{{comment.content}}</p>
    </div>

    <div class="row end">
      <button class="btn btn-error" @click="removeComment" >Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ZNotification from '@/library/z-notification'
import ApiClient from '~/library/ApiClient';
@Component({
  middleware: ['check', 'notLogged'],
})
export default class CommentDetail extends Vue {
  @Prop() readonly comment!: any


  formatDateData(data:string) {
    return data.split('T')[0].split('-').join('/');
  }

  async removeComment() {
    try {
      await new ApiClient().delete(`admin/comments/${this.comment.id}`);
      ZNotification.success({
          title: "Success",
          description: "Remove comment successfully"
      })
      this.$router.push('/dashboard/comments');
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.container-comment {
  .row {
    display: flex;
    margin-top: 8px;

    a{
      text-decoration: none;
      color: #000;
      transition: all 0.3s;

      &:hover{
        color:#007bff;
      }
    }

    &-column{
      flex-direction: column;
      align-items: flex-start;
      margin-right: 32px;

      .file-music{
        margin-top: 16px;
      }
    }

    &.bio{
      margin-left: 32px;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      flex: 1;

      .bio{
        margin-top: 16px;
        padding: 16px;
        width: 100%;
        height: 200px;
        font-size: 14px;
        border: 1px solid rgba(43, 43, 43, 0.15);
      }

      .bio:focus{
        outline: none;
      }
    }

    &.end {
      justify-content: flex-end;
    }

    .name {
      padding-bottom: 4px;
      font-size: 22px;
      font-weight: 600;
    }

    .updated-at {
      padding-right: 320px;
      font-size: 14px;
    }

    .btn {
      cursor: pointer;
      display: inline-block;
      min-width: 100px;
      height: 30px;
      background-color: #007bff;
      border: 1px solid #007bff;
      border-radius: 3px;
      color: #fff;

      &.btn-error{
        background-color: #EB4E2C;
        border: 1px solid #EB4E2C;
      }
    }

    .title {
      display: block;
      font-weight: 600;
    }

    .music-item{
      border: none;
      font-size: 16px;

      &.name{
        padding-bottom: 4px;
        font-size: 22px;
        font-weight: 600;
      }
    }

    .music-item:focus{
      outline: none;
    }

    .music-infor {
      line-height: 34px;
    }

    .input-change{
      padding: 4px 4px 4px 0;
      border-bottom: 1px solid rgba(43, 43, 43, 0.15);
    }

    .select {
      position: relative;
      margin-right: 16px;

      .choose {
        display: inline-block;
        width: 100%;
        max-width: 300px;
        padding: 8px;
        height: 36px;
        font-size: 16px;
        color: #000;
        text-decoration: none;
        border: 1px solid rgba(43, 43, 43, 0.15);
        border-radius: 4px;
        border-collapse: collapse;
      }

      .choose::after {
        content: '';
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        height: 3px;
      }

      .option {
        position: absolute;
        opacity: 1;
        padding: 8px 0;
        border: 1px solid rgba(43, 43, 43, 0.15);
        border-radius: 4px;
        background-color: #fff;
        z-index: 1;
        transform: translate(-100%, 0);
        top: 100%;
        left: 100%;
        transition: all 0.3s;

        .child {
          border-bottom: none;
          padding: 8px;
        }

        .child:hover {
          cursor: pointer;
          background-color: #f8f9fa;
        }
      }
    }

    .select:hover{
        box-shadow: 0 0 5px rgba(43, 43, 43, 0.1);
    }

    #imagePre{
      position: relative;
      margin: 16px 0;

      #preview{
        display: block;
        width: auto;
        height: 200px;
      }
  
      #preview:hover{
        background-color: black;
      }

      .overlay{
        position: absolute;
        top:0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        transition: 0.3s ease;
        background-color: rgba(43, 43, 43, 0.7);
      }

      .text{
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
      }
    }

    #imagePre:hover > .overlay {
      opacity: 1;
      cursor: pointer;
    }
  
    #upFile{
      display: none;
    }
  }

  .col-3 {
    width: 25%;
  }

  .col-4 {
    width: 33.33333%;
  }

  .col-6 {
    width: 50%;
  }
}
</style>