<template>
  <LayoutAdmin/>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
    middleware: 'auth'
})
export default class Admin extends Vue{

}
</script>