<template>
  <table class="table">
      <thead>
          <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Position</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>001</td>
              <td>Hà</td>
              <td>Nguyễn Hữu</td>
              <td>hanhphph13462@fpt.edu.vn</td>
              <td>0234563452</td>
              <td>Female</td>
              <td>26/12/2000</td>
              <td>Admin</td>
          </tr>
          <tr>
              <td>002</td>
              <td>Hoàng</td>
              <td>Nghiêm Đăng</td>
              <td>hoangndph17343@fpt.edu.vn</td>
              <td>0234563452</td>
              <td>Female</td>
              <td>14/12/2000</td>
              <td>Admin</td>
          </tr>
          <tr>
              <td>003</td>
              <td>Hoàng</td>
              <td>Nguyễn Văn</td>
              <td>hoangnvph13341@fpt.edu.vn</td>
              <td>0234563452</td>
              <td>Male</td>
              <td>27/12/2000</td>
              <td>Admin</td>
          </tr>
      </tbody>
  </table>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Table extends Vue {

}
</script>

<style lang="less">
.table{
    width: 100%;
    border-collapse: collapse;
    border-radius: 3px;
    overflow: hidden;

    th, td{
        padding: 12px;
    }

    td{
        border-top: 1px solid #eee;
    }
}
</style>