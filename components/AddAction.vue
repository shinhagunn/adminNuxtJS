<template>
  <button class="action-add-btn" @click.prevent="handleActionAdd">
    Add
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({})
export default class MyClass extends Vue {
  handleActionAdd(){
    this.$emit('handleActionAdd');
  }
}
</script>

<style lang="less">
.action-add-btn{
  cursor: pointer;
  display: inline-block;
  min-width: 100px;
  height: 30px;
  background-color: #3FBD60;
  border: 1px solid #3FBD60;
  border-radius: 3px;
  color: #fff;
}
</style>