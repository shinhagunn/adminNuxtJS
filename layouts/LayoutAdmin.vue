<template>
    <div class="container">
        <nav class="menu">
            <figure class="menu-icon">
                <img src="" alt="">
            </figure>

            <ul class="menu-list">
                <li class="menu-item"></li>
            </ul>
        </nav>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LayoutAdmin extends Vue{

}
</script>