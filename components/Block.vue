<template>
  <div class="content-block">
      <h2>{{ blockName }}</h2>
      <span v-if="blockName" class="underline"></span>
      <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Table extends Vue {
  @Prop() readonly blockName!: string;
}
</script>

<style lang="less">
.content-block {
    // position: relative;
    margin: 20px 34px;
    padding: 16px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.15);

    h2 {
      font-size: 16px;
    }

    .underline {
      display: block;
      margin: 16px 0;
      width: 100px;
      border: 1px solid #212529;
    }

    &.pb-none {
      padding-bottom: 4px;
    }

  &.table-album-music{
    margin: 0;
    box-shadow: none;
  }

  &.table-album-music + &.table-album-music{
    border-left: 1px solid rgba(43, 43, 43, 0.15);
  }
}
</style>
