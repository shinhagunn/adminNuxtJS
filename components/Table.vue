<template>
  <div class="a-table">
    <div class="a-table-head">
      <span
        v-for="col in columns"
        :key="col.key"
        :class="[col.class, `text-${col.align || 'left'}`]"
      >
        {{ col.title }}
      </span>
    </div>

    <div class="a-table-content">
      <div v-for="(row, index) in data" :key="index" class="a-table-row">
        <span
          v-for="col in columns"
          :key="col.key"
          :class="[col.class, `text-${col.align || 'left'}`]"
        >
          {{ row[col.key] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Column } from '~/types';

@Component({})
export default class Table extends Vue {
  @Prop() readonly data!: any[];
  @Prop() readonly columns!: Column[];
}
</script>

<style lang="less">
.a-table {
  background-color: #fff;


  &-head, &-row {
    position: relative;
    border-bottom: 1px solid rgb(226, 223, 223);
    display: flex;

    > span {
      flex: 1;
    }
  }

  &-content {
    position: relative;
  }
}
</style>
