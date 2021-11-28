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
              <div v-for="(filter, index) in filters" :key="filter.id" class="drawer-main-item">
                <p class="drawer-main-item-title">{{filter.title}}</p>
                <DropDown v-if="filter.trasform = 'dropdown'" placement="bottomLeft" @updateData="updateData">
                  <span>{{values[index]}}</span>
                  <template slot="overlay">
                    <div v-for="item in filter.type" :key="item.id" :type="filter.title" @click="handleData($event, filter.id)"> 
                        {{ item }}
                      </div>
                  </template>
                </DropDown>
              </div>

              <div class="drawer-main-btns">
                <a v-if="data.length == 0" class="drawer-btn-unactive" >Filter</a>
                <a v-else :href="url" class="drawer-btn" >Filter</a>
                <button class="drawer-btn" @click="resetValues">Reset</button>
              </div>

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

  url:string = '';
  
  values:string[] = this.createValues();

  createValues(){
    const result: string[] = [];
    this.filters.forEach( () => {
    result.push('');
    } );
    return result;
  }

  data: string[] = [];

  onFadeFilter(){
    this.$emit('onFadeFilter');
  }

  filterTest(){
    this.$router.replace(this.url)
  }

  handleData(e: any, id: number){
    const index = this.filters.findIndex((filter) => {
      return filter.id === id;
    });

    const value = `${e.target.getAttribute('type')}=${e.target.innerText}`;
    const exist = this.data.findIndex(x => {
      return x.search(e.target.getAttribute('type')) !== -1;
    })
    if(exist === -1) {
      this.addData(value)
    } else {
      this.updateData(value, exist);
    }
    
    this.values[index] = e.target.innerText;

    this.url = this.$route.path + '?' + this.data.join('&')
  }

  addData(value:string){
    this.data.push(value);
  }

  updateData(value:string, index:number){
    this.data[index] = value;
  }

  resetValues(){
    this.values = this.createValues();
    this.data = [];
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

    &-content{
      margin-top: 8px;
      padding: 12px;
    }

    &-item{
      margin-bottom: 16px;
    }

    &-btns{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 16px;
      display: flex;
      justify-content: space-around;
    }
  }

  &-btn{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    height: 30px;
    background-color: #007bff;
    border: 1px solid #007bff;
    border-radius: 3px;
    text-decoration: none;
    color: #fff;
    font-size: 14px;

    &-unactive{
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100px;
      height: 30px;
      border-radius: 3px;
      text-decoration: none;
      color: #fff;
      font-size: 14px;
      background-color: gray;
      border: 1px solid gray;
      cursor: auto;
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