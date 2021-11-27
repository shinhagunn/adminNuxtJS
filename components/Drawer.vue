<template>
  <div class="drawer">
    <transition name="fade">
        <div v-if="isFilter" class="drawer-overlay" @click="onFadeFilter">
        </div>
    </transition>

    <transition name="slide-fade">
        <div v-if="isFilter" class="drawer-main">
            <div class="drawer-main-header">
                <i class="fas fa-times" @click="onFadeFilter"></i>
                Filter data here
            </div>
            
            <div class="drawer-main-content">
                <div v-for="filter in filters" :key="filter.id" class="drawer-main-item">
                  <p class="drawer-main-item-title">{{filter.title}}</p>
                  <DropDown v-if="filter.trasform = 'dropdown'" placement="bottomLeft">
                    {{filter.default}}
                    <template slot="overlay">
                      <div v-for="item in filter.type" :key="item.id" @click="filter.default = item">
                          {{ item }}
                        </div>
                    </template>
                  </DropDown>
                </div>

                <a :href="url" class="drawer-btn">Filter</a>
            </div>

        </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { Filter } from "~/types";

@Component({})
export default class MyClass extends Vue {
  @Prop() readonly isFilter!: boolean;
  @Prop() readonly filters!: Filter[];

  url = this.$route.path + '?state=active';

  onFadeFilter(){
    this.$emit('onFadeFilter');
  }

  filterTest(){
    this.$router.replace(this.url)
  }
}
</script>

<style lang="less">
.drawer{
  &-overlay{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(43, 43, 43, 0.3);
    z-index: 1;
  }

  &-main{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20%;
    background-color: #fff;
    z-index: 2;
    box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1);

    &-header{
      display: flex;
      align-items: center;
      padding: 12px;
      font-weight: 600;
      border-bottom: 1px solid #e8e9eb;

      i{
          margin-right: 12px;
          font-size: 20px;
          color: #b7c0cd;
      }
    }

    &-header:hover > i{
        cursor: pointer;
    }
  }

  &-btn{
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    cursor: pointer;
    display: inline-block;
    min-width: 100px;
    height: 30px;
    background-color: #007bff;
    border: 1px solid #007bff;
    border-radius: 3px;

    > a {
      text-decoration: none;
      color: #fff;
    }
  }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .1s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(20%);
    opacity: 0;
}
</style>