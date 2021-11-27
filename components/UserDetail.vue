<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <p class="email">{{ user.email }}</p>
        <p class="updated-at">
          Last updated: {{ formatDateData(user.updated_at) }}
        </p>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <span class="title">First Name</span>
          </div>
          <div class="col-6">
            <span class="title">Last Name</span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p class="user-infor">{{user.first_name}}</p>
          </div>
          <div class="col-6">
            <p class="user-infor">{{user.last_name}}</p>
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
        <span class="title">State</span>
      </div>
      <div class="col-3">
        <span class="title">Role</span>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <p class="user-infor">{{user.id}}</p>
      </div>
      <div class="col-3">
        <p class="user-infor">{{ formatDateData(user.created_at) }}</p>
      </div>

      <div class="col-3">
        <DropDown placement="bottomLeft">
          {{state}}
          <template slot="overlay">
            <div v-for="item in userState" :key="item" @click="changeState(item)">
                {{ item }}
              </div>
          </template>
        </DropDown>
      </div>
      <div class="col-3">
        <DropDown placement="bottomLeft">
          {{role}}
          <template slot="overlay">
            <div v-for="item in userRole" :key="item" @click="changeRole(item)">
                {{ item }}
              </div>
          </template>
        </DropDown>
      </div>
    </div>

    <div class="row row-column">
      <p class="title">Avatar</p>
      <label id="imagePre" for="upFile">
        <img  id="preview"  :src="url" />
        <div class="overlay">
          <i class="fas fa-upload text"></i>
        </div>
      </label>
      <div>
        <input id="upFile" name="" type="file" @change="onFileChange"/>
      </div>
    </div>

    <div class="row bio">
      <p class="title">About me</p>
      <textarea v-model="bio" class="bio"></textarea>
    </div>

    <div class="row end">
      <button class="btn" @click="updateUser" >Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ApiClient from '~/library/ApiClient';
import { UserState, UserRole} from '~/types'
@Component({
  middleware: ['check', 'notLogged'],
})
export default class UserDetail extends Vue {
  @Prop() readonly user!: any

  url = `https://learn.huuhait.me/api/v2/public/users/${this.user.id}/avatar`;
  state = this.user.state;
  role = this.user.role;
  bio = this.user.bio;
  avatar:any;
  isUpImage = false;
  dropDownRole = false;
  dropDownState = false;

  get userState() {
    const result = []

    for (const value in UserState) {
      result.push(value.toLowerCase())
    }

    return result
  }

  get userRole() {
    const result = []

    for (const value in UserRole) {
      result.push(value.toLowerCase())
    }

    return result
  }

  // dropDown(e){
  //   console.log('ahihi');
  // }

  changeState(state: UserState){
    this.state = state;
    // e.target.parentElement.style.display = "none";
  }

  changeRole(role: UserRole){
    this.role = role;
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').join('/');
  }

  onFileChange(e: any) {
    this.avatar = e.target.files[0];
    this.url = URL.createObjectURL(this.avatar);
  }

  async updateUser() {
    const data = new FormData();
    data.set('first_name', this.user.first_name);
    data.set('last_name', this.user.last_name);
    data.set('state', this.state);
    data.set('role', this.role);
    data.set('bio', this.bio);
    data.set('avatar', this.avatar as File);
    try {
      await new ApiClient().put(`admin/users/${this.user.uid}`, data);
      this.$router.push('/dashboard/users');
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.container {
  .row {
    display: flex;
    align-items: center;
    margin-top: 8px;

    &-column{
      flex-direction: column;
      align-items: flex-start;
    }

    &.bio{
      flex-direction: column;
      align-items: flex-start;
      position: relative;

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

    .email {
      padding-bottom: 4px;
      font-size: 22px;
      font-weight: 600;
    }

    .updated-at {
      // padding-bottom: 16px;
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
    }

    .title {
      display: block;
      // padding-top: 16px;
      font-weight: 600;
    }

    .user-infor {
      // margin-top: 16px;
      line-height: 34px;
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

      // .choose:focus {
      //   box-shadow: 0 0 5px 6px rgba(43, 43, 43, 0.1);
      // }

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
        // height: 0%;
        border: 1px solid rgba(43, 43, 43, 0.15);
        // box-shadow: 0 0 5px rgba(43, 43, 43, 0.15);
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

    // .select:hover > .option {
    //   display: block;
    // }

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