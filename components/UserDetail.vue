<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="email">{{ user.email }}</p>
        <p class="updated-at">
          Last updated: {{ formatDateData(user.updated_at) }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <span class="title">UID</span>
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
      <div class="col col-3">
        <p class="user-infor">{{user.uid}}</p>
      </div>
      <div class="col col-3">
        <p class="user-infor">{{ formatDateData(user.created_at) }}</p>
      </div>

      <div class="col col-3">
        <div class="select">
          <a href="#" class="choose">{{user.state}}</a>
          <div class="option">
            <div v-for="item in userState" :key="item" :data="item" class="child" @click="changeState($event)" @click.stop>
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="col col-3">
        <div class="select">
          <a href="#" class="choose">{{user.role}}</a>
          <div class="option">
            <div v-for="item in userRole" :key="item" :data="item" class="child" @click="changeRole($event)" @click.stop>
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <input type="file" @change="onFileChange" />

      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
    </div>

    <div class="row bio">
      <p class="title">About me</p>
      <textarea class="bio">About me...</textarea>
    </div>

    <div class="row end">
      <button class="btn">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { UserState, UserRole } from '~/types'
@Component({
  middleware: ['check', 'notLogged'],
})
export default class UserDetail extends Vue {
  @Prop() readonly user!: any

  url:string | null = null
  state = UserState.Active
  role = UserRole.Member

  get userState() {
    const result = []

    for (const value in UserState) {
      result.push(value)
    }

    return result
  }

  get userRole() {
    const result = []

    for (const value in UserRole) {
      result.push(value)
    }

    return result
  }

  // dropDown(e){
  //   console.log('ahihi');
  // }

  changeState(e:any){
    this.user.state = e.target.getAttribute('data');
    // e.target.parentElement.style.display = "none";
  }

  changeRole(e:any){
    this.user.role = e.target.getAttribute('data');
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').reverse().join('/');
  }

  onFileChange(e: any) {
    const file = e.target.files[0];
    this.url = URL.createObjectURL(file);
  }
}
</script>

<style lang="less">
.container {
  .row {
    display: flex;
    align-items: center;
    margin: 16px 0;

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
      padding-top: 16px;
      font-weight: 600;
    }

    .user-infor {
      // margin-top: 16px;
      line-height: 34px;
    }

    .select {
      position: relative;
      width: 300px;

      .choose {
        display: inline-block;
        width: 300px;
        padding: 8px;
        height: 36px;
        font-size: 16px;
        color: #000;
        text-decoration: none;
        border: 1px solid #aaa;
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
        top: calc(100% + 2px);
        left: 0;
        right: 0;
        padding: 8px 0;
        transition: all 1s;
        display: none;
        border: 1px solid #aaa;
        box-shadow: 0 0 5px 6px rgba(43, 43, 43, 0.1);
        border-radius: 4px;
        background-color: #fff;
        z-index: 99;
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
        box-shadow: 0 0 5px 6px rgba(43, 43, 43, 0.1);
    }

    .select:hover > .option {
      display: block;
    }
  }

  .col-3 {
    width: 25%;
  }
}
</style>