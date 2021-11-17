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
      <div v-if="modeTable === 'Link'">
        <nuxt-link 
          v-for="(row, index) in data" 
          :key="index" class="a-table-row"
          :to="urlCurrent + '/' + row.uid">
          <span
            v-for="col in columns"
            :key="col.key"
            :class="[col.class, 'item', `text-${col.align || 'left'}`]"
          >
            {{ row[col.key] }}
          </span>
        </nuxt-link>
      </div>

      <div v-else>
        <span v-for="(row, index) in data" :key="index" class="a-table-row">
          <span
            v-for="col in columns"
            :key="col.key"
            :class="[col.class, 'item', `text-${col.align || 'left'}`]"
          >
            {{ row[col.key] }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Column, ModeTable } from '~/types'

@Component({})
export default class Table extends Vue {
  @Prop() readonly data!: any[]
  @Prop() readonly columns!: Column[]
  @Prop() readonly modeTable!: ModeTable
  
  urlCurrent = this.$route.path;
}
</script>

<style lang="less">
.a-table {
  background-color: #fff;

  &-head,
  &-row {
    position: relative;
    border-bottom: 1px solid rgb(226, 223, 223);
    display: flex;
    align-items: center;

    > a,
    span {
      flex: 1;
      padding: 16px;
    }
  }

  &-head {
    font-weight: 600;
    color: #212529;
  }

  &-row {
    text-decoration: none;
    color: #212529;
  }

  &-row:hover {
    background-color: #f3f2f2;
    box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1);

  }

  &-content {
    position: relative;
  }
}
</style>
