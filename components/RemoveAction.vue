<template>
  <button class="action-remove-btn" @click.prevent="handleActionRemove">
    Remove
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({})
export default class MyClass extends Vue {
  handleActionRemove(){
    this.$emit('handleActionRemove');
  }
}
</script>

<style lang="less">
.action-remove-btn{
  cursor: pointer;
  display: inline-block;
  min-width: 100px;
  height: 30px;
  background-color: #EB4E2C;
  border: 1px solid #EB4E2C;
  border-radius: 3px;
  color: #fff;
}
</style>