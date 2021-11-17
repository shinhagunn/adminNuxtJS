<template>
  <div class="form">
    <form @submit.prevent>
      <div>
        <input v-model="email" type="email" placeholder="Email">
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password">
      </div>
      <button @click="login">Login</button>
    </form>

    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
@Component({
  middleware: ['check', 'login']
})
export default class Index extends Vue {
  email = '';
  password = '';

  async login() {

    try {
      await this.$axios.post('http://localhost:3000/api/v2/identity/session', { email: this.email, password: this.password });
      this.$router.push('/admin');
    } catch (error) {
      this.auth_error();
      return error;
    }
  }

  auth_error() {
    this.$store.commit('setId', null);
    this.$store.commit('setUid', null);
    this.$store.commit('setFullname', null);
    this.$store.commit('setLastname', null);
    this.$store.commit('setState', null);
    this.$store.commit('setEmail', null);
    this.$store.commit('setRole', null);
  }
}
</script> 

<style lang="less">
  > input, button{
    margin-left: 100px;
    padding-left: 16px;
    width: 300px;
    height: 50px;
  }
</style>