<template>
  <div class="container-album">
    <div class="row">
      <div class="col-6">
        <input v-model="name" class="music-item name" type="text" title="Click here to change">
        <p class="updated-at">
          Last updated: {{ formatDateData(album.updated_at) }}
        </p>
      </div>
      <div class="col-6">
        <div class="row flex-right">
          <div class="col-4 ">
            <span class="title">User UID</span>
          </div>
          <div class="col-4">
            <span class="title">View Count</span>
          </div>
          <div class="col-4  text-right">
            <span class="title">Created At</span>
          </div>
        </div>
        <div class="row flex-right">
          <div class="col-4">
            <p class="music-infor">{{album.user_uid}}</p>
          </div>
          <div class="col-4">
            <p class="music-infor">{{album.view_count}}</p>
          </div>
          <div class="col-4  text-right">
            <p class="music-infor">{{album.created_at}}</p>
          </div>
          
        </div>
      </div>
    </div>

    <div class="row">

      <div class="row row-column">
        <p class="title">Image</p>
        <label id="imagePre" for="upFile">
          <img class="image-music" id="preview"  :src="url" />
          <div class="overlay">
            <i class="fas fa-upload text"></i>
          </div>
        </label>
        <div>
          <input id="upFile" name="" type="file" @change="onFileChange"/>
        </div>
      </div>

      <div class="row bio">
        <p class="title">Description</p>
        <textarea v-model="description" class="bio"></textarea>
      </div>
    </div>

    <div class="row end">
      <button class="btn btn-error" @click="removeAlbum" >Remove</button>
      <button class="btn" @click="updateAlbum">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ZNotification from "@/library/z-notification"
import ApiClient from '~/library/ApiClient';
@Component({
  middleware: ['check', 'notLogged'],
})
export default class AlbumDetail extends Vue {
  @Prop() readonly album!: any

  name = this.album.name;
  description = this.album.description;
  url = `http://learn.huuhait.me/api/v2/public/albums/${this.album.id}/image`;
  avatar:any;

  formatDateData(data:string) {
    return data.split('T')[0].split('-').join('/');
  }

  updateAlbum() {
    this.$emit("updateAlbum", this.name, this.description, this.avatar);
  }

  onFileChange(e: any) {
    this.avatar = e.target.files[0];
    if(e.target.files[0] !== undefined){
      this.url = URL.createObjectURL(this.avatar);
    }
  }

  async removeAlbum(){
    try {
      await new ApiClient().delete(`admin/albums/${this.album.id}`);

      ZNotification.success({
          title: "Success",
          description: "Remove album successfully"
      })
      
      this.$router.push('/dashboard/albums');
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.container-album {
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

    .flex-right{
      justify-content: flex-end;
    }

    .text-right{
      text-align: right;
    }

    &-column {
      flex-direction: column;
      align-items: flex-start;
      margin-right: 32px;

      .file-music {
        margin-top: 16px;
      }
    }

    &.bio {
      margin-left: 32px;
      flex-direction: column;
      align-items: flex-end;
      position: relative;
      flex: 1;

      .bio {
        margin-top: 16px;
        padding: 16px;
        width: 70%;
        height: 200px;
        font-size: 14px;
        border: 1px solid rgba(43, 43, 43, 0.15);
      }

      .bio:focus {
        outline: none;
      }
    }

    &.end {
      justify-content: space-between;
    }

    .name {
      padding-bottom: 4px;
      font-size: 22px;
      font-weight: 600;
    }

    .updated-at {
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

  .col-9{
    width: 75%;
  }
}
</style>