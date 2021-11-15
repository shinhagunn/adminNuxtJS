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
      const { data } = await this.$axios.post('http://localhost:3000/api/v2/identity/session', { email: this.email, password: this.password });
      this.$store.commit('setId', data.id);
      this.$store.commit('setUid', data.uid);
      this.$store.commit('setFullname', data.full_name);
      this.$store.commit('setLastname', data.last_name);
      this.$store.commit('setState', data.state);
      this.$store.commit('setEmail', data.email);
      this.$store.commit('setRole', data.role);
      this.$router.push('/admin');
    } catch (error) {
      this.auth_error();
      return error;
    }
  }

  auth_error() {
    console.log('error');
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
  input, button{
    margin-left: 100px;
    padding-left: 16px;
    width: 300px;
    height: 50px;
  }
</style>