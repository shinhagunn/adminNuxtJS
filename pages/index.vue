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
import {UserRole, UserState} from '@/types/index'
@Component({
  // middleware: 'check'
})
export default class Index extends Vue {
  email = '';
  password = '';

  async login() {

    try {
      const { data } = await this.$axios.post('http://localhost:3000/api/v2/identity/session', { email: this.email, password: this.password });

      this.auth_success(data.id, data.uid, data.full_name, data.last_name, data.state, data.email, data.role);
    } catch (error) {
      this.auth_error();
      return error;
    }
  }

  auth_success(id: number, uid: string, full_name: string, last_name: string, state: UserState, email: string, role: UserRole) {
    console.log('success');
    this.$store.commit('setId', id);
    this.$store.commit('setUid', uid);
    this.$store.commit('setFullname', full_name);
    this.$store.commit('setLastname', last_name);
    this.$store.commit('setState', state);
    this.$store.commit('setEmail', email);
    this.$store.commit('setRole', role);
    this.$router.push('/admin');
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