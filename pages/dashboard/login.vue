<template>
  <div class="login-container">
    <div class="">
      <img src="@/assets/images/background_login.jpg" alt="">
    </div>
    <div class="login-block">
      <div class="login-main">
        <div class="login-form">
          <h2 class="title">Login to MyMusic</h2>
          <form action="" @submit.prevent>
            <div class="form-block">
              <label for="iemail">Email</label>
              <input
                v-model="email"
                class="form-control"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="form-block">
              <label for="ipassword">Password</label>
              <input
                v-model="password"
                class="form-control"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div class="form-block">
              <button 
                class="form-control btn"
                @click="login"
              >
              Login
              </button>
            </div>
          </form> 
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ApiClient from '~/library/ApiClient';
@Component({
  middleware: ['check', 'login']
})
export default class Index extends Vue {
  email = '';
  password = '';

  async login() {

    try {
      await new ApiClient().post('identity/session', { email: this.email, password: this.password });
      this.$router.push('/dashboard');
    } catch (error) {
      this.auth_error();
      return error;
    }
  }

  auth_error() {
    this.$store.commit('setId', null);
    this.$store.commit('setUid', null);
    this.$store.commit('setFirstname', null);
    this.$store.commit('setLastname', null);
    this.$store.commit('setState', null);
    this.$store.commit('setEmail', null);
    this.$store.commit('setRole', null);
    this.$store.commit('setBio', null);
    this.$store.commit('setCreatedAt', null);
    this.$store.commit('setUpdatedAt', null);
    this.$store.commit('setLogged', false);
    this.$store.commit('setReload', true);
  }
}
</script> 

<style lang="less">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.login-container {
  display: flex;
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  background-size: cover;
  font-family: Arial, Helvetica, sans-serif;

  img{
    width: 100%;
    height: 100%;
  }
}

.login-block {
  padding: 60px;
  width: 50%;
  height: 100vh;
  background-color: #fff;

  a {
    text-decoration: none;
    color: rgb(119, 85, 229);
  }

  a:hover {
    text-decoration: underline;
  }

  .login-main {
    .login-another {
      .register {
        margin-bottom: 80px;
        text-align: right;
        font-size: 14px;
      }
    }

    .login-form {
      margin: 0 auto;
      width: 450px;

      .title {
        margin-bottom: 80px;
        display: inline-block;
        line-height: 36px;
        font-size: 24px;
        font-weight: 500;
        color: #6039de;
        border-bottom: solid 2px #6039de;
      }

      .form-block {
        margin: 18px 0;

        label {
          margin-bottom: 8px;
          display: inline-block;
          font-size: 16px;
        }

        .form-control {
          padding: 0 12px;
          width: 100%;
          height: 46px;
          display: block;
          background-color: #f5f7f9;
          border: 1px solid #fff;
          border-radius: 5px;
          transition: all 0.3s;
        }

        .form-control:hover {
          border: 1px solid #6039de;
        }

        .form-control:focus {
          border: 1px solid #6039de;
          outline: none;
        }

        .btn {
          margin-top: 120px;
          background-color: #7755e5;
          border: none;
          color: #fff;
          transition: all 0.3s;
        }

        .btn:hover {
          border: none;
          cursor: pointer;
          background-color: rgba(119, 85, 229, 0.85);
        }
      }

      .forgot {
        font-size: 14px;
      }
    }
  }
}
</style>