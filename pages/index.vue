<template>
  <div class="form">
    <form @submit.prevent>
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="password" type="password" placeholder="Password">
      <button @click="login">Login</button>
    </form>

    <p>{{ status }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'nuxt-property-decorator'
@Component({})
export default class Index extends Vue {
  username = '';
  password = '';

  status = this.$store.state.authenticated;

  login(){
    this.$store.commit('setUser', this.username)
    this.$store.commit('setPass', this.password)
    this.$store.commit('isLogin')
    this.$router.push('/admin');
  }
}
</script> 
