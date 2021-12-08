<template>
  <div class="container-music">
    <div class="row">
      <div class="col-6">
        <input v-model="name" class="music-item name" type="text" title="Click here to change">
        <p class="updated-at">
          Last updated: {{ formatDateData(music.updated_at) }}
        </p>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <span class="title">Author</span>
          </div>
          <div class="col-6">
            <span class="title">View Count</span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <input v-model="author" class="music-item input-change" type="text" title="Click here to change">
          </div>
          <div class="col-6">
            <p class="music-infor">{{music.view_count}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <span class="title">ID</span>
      </div>
      <div class="col-3">
        <span class="title">Created At</span>
      </div>
      <div class="col-3">
        <span class="title">User UID</span>
      </div>
      <div class="col-3">
        <span class="title">State</span>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p class="music-infor">{{music.id}}</p>
      </div>
      <div class="col-3">
        <p class="music-infor">{{ formatDateData(music.created_at) }}</p>
      </div>

      <div class="col-3">
        <nuxt-link :to="`/dashboard/users/${music.user_uid}`" class="music-infor">{{music.user_uid}}</nuxt-link>
      </div>
      <div class="col-3">
        <DropDown placement="bottomLeft">
          {{state}}
          <template slot="overlay">
            <div v-for="item in musicState" :key="item" @click="changeState(item)">
                {{ item }}
              </div>
          </template>
        </DropDown>
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

      <div class="row row-column">
        <p class="title">Music</p>
        <div>
          <input class="file-music" type="file" @change="onMusicChange"/>
        </div>
      </div>

      <div class="row bio">
        <p class="title">Description</p>
        <textarea v-model="description" class="bio"></textarea>
      </div>
    </div>

    <div class="row end">
      <button class="btn btn-error" @click="removeMusic" >Remove</button>
      <button class="btn" @click="updateUser">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ApiClient from '~/library/ApiClient';
import ZNotification from "@/library/z-notification"
import { MusicState} from '~/types'
@Component({
  middleware: ['check', 'notLogged'],
})
export default class MusicDetail extends Vue {
  @Prop() readonly music!: any

  url = `http://learn.huuhait.me/api/v2/public/musics/${this.music.id}/image`;
  name = this.music.name;
  author = this.music.author;
  state = this.music.state;
  description = this.music.description;
  sing: any;
  avatar:any;
  isUpImage = false;

  get musicState() {
    const result = []

    for (const value in MusicState) {
      result.push(value.toLowerCase())
    }

    return result
  }

  changeState(state: MusicState){
    this.state = state;
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').join('/');
  }

  onFileChange(e: any) {
    this.avatar = e.target.files[0];
    if(e.target.files[0] !== undefined){
      this.url = URL.createObjectURL(this.avatar);
    }
  }

  onMusicChange(e: any) {
    this.sing = e.target.files[0];
  }

  async updateUser() {
    const data = new FormData();
    data.set('name', this.name);
    data.set('description', this.description);
    data.set('author', this.author);
    data.set('state', this.state);
    data.set('image', this.avatar as File);
    data.set('music', this.sing as File);
    try {
      await new ApiClient().put(`admin/musics/${this.music.id}`, data);

      ZNotification.success({
          title: "Success",
          description: "Music update successfully"
      })

      this.$router.push('/dashboard/musics');
    } catch (error) {
      return error;
    }
  }

  async removeMusic() {
    try {
      await new ApiClient().delete(`admin/musics/${this.music.id}`);
      ZNotification.success({
          title: "Success",
          description: "Remove music successfully"
      })
      this.$router.push('/dashboard/musics');
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.container-music {
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
      justify-content: space-between;
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

    .input-change {
      padding: 4px 4px 4px 0;
      border:none;
      border-bottom: 1px solid rgba(43, 43, 43, 0.15);
      font-size: 16px;
      transition: all 0.3s;

      &:focus, &:hover {
        border-bottom: 1px solid #007bff;
      }
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

  .col-6 {
    width: 50%;
  }
}
</style>