<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p class="email">Email ở đây</p>
        <p class="updated-at">
          Last updated: Thời gian cập nhật mới nhất ở đây
        </p>
      </div>
    </div>

    <div class="row">
        <div class="col-3">
            <span class="title">UID</span>
        </div>
        <div class="col-3">
            <span class="title">Create at</span>
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
        <p class="user-infor">UID ở đây</p>
      </div>
      <div class="col col-3">
        <p class="user-infor">Thời gian tạo tài khoản ở đây</p>
      </div>

      <div class="col col-3">
        <!-- <select class="user-infor">
          <option v-for="state in userState" :key="state" value="state">{{ state }}</option>
        </select> -->
        <div class="select">
            <input type="text" :value="state" readonly>
            <div class="option">
                <input v-for="item in userState" :key="item" type="text" :value="item" readonly>
            </div>
        </div>
      </div>
      <div class="col col-3">
        <select class="user-infor">
          <option v-for="role in userRole" :key="role" value="role">{{ role }}</option>
        </select>
      </div>
    </div>

    <div class="row end">
      <button class="btn">Update</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { UserState, UserRole } from '~/types'
@Component({
  middleware: ['check', 'notLogged'],
})
export default class UserDetail extends Vue {
    state = UserState.Active;

    get userState() {
        const result = [];

        for (const value in UserState) {
            result.push(value);
        }

        return result;
    }

    get userRole() {
        const result = [];

        for (const value in UserRole) {
            result.push(value);
        }

        return result;
    }
}
</script>

<style lang="less">
.container {
  .row {
    display: flex;
    align-items: center;
    margin: 16px 0;

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
      margin-top: 16px;
    }

    .select {
        position: relative;
        input{
            display: inline-block;
            padding: 8px;
            min-width: 300px;
            height: 36px;
            font-size: 16px;
            border: 1px solid #000;
            border-radius: 0; 
            border-collapse: collapse;
        }

        .option{
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            transition: all 1s;
            display: none;
            input{
                border-bottom: none;
            }

            input:hover{
                background-color: tan;
            }

            input:first-child{
                border-top: none;
            }

            input:last-child{
                border-bottom: 1px solid #000;
            }
        }
        
        
    }

    .select:hover > .option{
        display: block;
    }
  }

  .col-3 {
    width: 25%;
  }
}
</style>