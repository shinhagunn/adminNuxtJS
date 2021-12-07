<template>
  <div class="pagination">
    <nuxt-link v-for="index in parseInt(numberPage)" :key="index.id" class="pagination-item">
      {{index}}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class MyClass extends Vue {
  @Prop() readonly quantityRowPerPage!: number;
  @Prop() readonly dataLength!: number;

  numberPage = (this.dataLength / this.quantityRowPerPage) + 1;

  changePageNumber(index:number) {
    this.$emit('changePageNumber', index)
  }
}
</script>

<style lang="less">
.pagination{
  margin: 16px;
  display: flex;
  justify-content: center;

  &-item{
    cursor: pointer;
    margin: 0 4px;
    padding: 8px;
    border: 1px solid rgba(43, 43, 43, 0.3);
    border-radius: 3px;
    color: #007bff;
  }

  &-item:hover{
    background-color: rgba(43, 43, 43, 0.15);
  }
}
</style>