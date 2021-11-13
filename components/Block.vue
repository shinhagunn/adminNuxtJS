<template>
  <div class="content-block">
      <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Table extends Vue {

}
</script>

<style lang="less">
.content-block{
    margin: 16px;
    padding: 16px;
    background-color: #fff;
    border-radius: 3px;
}
</style>
