<template>
  <div class="a-table">
    <div class="a-table-head">
      <span
        v-for="col in columns"
        :key="col.key"
        :class="[col.key, col.class, `text-${col.align || 'left'}`]"
      >
        {{ col.title }}
      </span>
    </div>

    <div class="a-table-content">
      <EmptyPage v-if="data.length === 0" />
      <TableRow
        v-for="(row, index) in data"
        :key="index"
        :is-router-link="isRouterLink"
        :to="routerLink(row)"
      >
        <span
          v-for="col in columns"
          :key="col.key"
          :class="[col.key, col.class, 'item', `text-${col.align || 'left'}`]"
        >
          {{ row[col.key] }}
        </span>
      </TableRow>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Column } from '~/types'

@Component({})
export default class Table extends Vue {
  @Prop() readonly data!: any[]
  @Prop() readonly columns!: Column[]
  @Prop() readonly isRouterLink!: boolean
  @Prop() readonly routerBuilder!: string

  urlCurrent = this.$route.path

  routerLink(item: any) {
    if (!this.isRouterLink) return
    let routerBuilder = this.routerBuilder

    let start_index = 0
    for (let i = 0; i < routerBuilder.length; i++) {
      const str = routerBuilder[i]
      if (str === '#') {
        start_index = i
        continue
      }
      if (str === '}') {
        const param = routerBuilder.slice(start_index, i + 1)
        let param_key = param.replace(/#\{|\}/gi, '')

        const toUpper = param_key.includes('toUpper')
        const toLower = param_key.includes('toLower')

        if (toUpper) {
          param_key = param_key.replace('.toUpper', '')
        } else if (toLower) {
          param_key = param_key.replace('.toLower', '')
        }

        let value = this.getValueByKey(param_key, item)
        if (toUpper) {
          value = value.toUpperCase()
        } else if (toLower) {
          value = value.toLowerCase()
        }

        routerBuilder = routerBuilder.replace(param, value)
        i = 0
        continue
      }
    }

    return routerBuilder
  }

  getValueByKey(key: string, item: any) {
    let value

    if (key.includes('.')) {
      const keys = key.split('.')
      let inv: any = null

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]

        if (index === 0) {
          inv = item[key]
        } else {
          inv = inv[key]
        }
      }

      value = inv
    } else {
      value = item[key]
    }

    return value
  }
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
      // flex: 1;
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
