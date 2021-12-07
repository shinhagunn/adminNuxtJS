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
                <DropDown v-if="filter.transform == 'dropdown'" placement="bottomLeft" @updateData="updateData">
                  <span>{{values[filter.title.toLowerCase()]}}</span>
                  <template slot="overlay">
                    <div v-for="item in filter.type" :key="item.id" @click="handleDataDropDown($event, filter.title.toLowerCase())"> 
                        {{ item }}
                      </div>
                  </template>
                </DropDown>
                <filter-text v-if="filter.transform == 'text'" >
                  <input class="filter-text-input" type="text" :value="values[filter.title.toLowerCase()]" @change="handleDataText($event, filter.title.toLowerCase())">
                </filter-text>
              </div>

              <div class="drawer-main-btns">
                <a v-if="data.length == 0" class="drawer-btn-unactive" >Filter</a>
                <a v-else :href="url" class="drawer-btn" >Filter</a>
                <a :href="$route.path" class="drawer-btn" @click="resetValues">Reset</a>
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
  
  values = this.createValues();

  createValues(){
    const result: {[key: string]: string} = {};
    const query = this.$route.query as any;
    for(const param in query) {
      result[param] = query[param];
    }

    return result;
  }

  data: string[] = this.getParamsFromUrl(this.$route.fullPath).split('&');

  onFadeFilter(){
    this.$emit('onFadeFilter');
  }

  filterTest(){
    this.$router.replace(this.url)
  }

  handleDataDropDown(e: any, title:string){
    const value = `${title}=${e.target.innerText}`;
    const exist = this.data.findIndex(x => {
      return x.search(title) !== -1;
    })
    if(exist === -1) {
      this.addData(value)
    } else {
      this.updateData(value, exist);
    }
    
    this.values[title] = e.target.innerText;

    this.url = this.$route.path + '?' + this.data.join('&')
  }

  handleDataText(e: any, title:string){
    const value = `${title}=${e.target.value}`;

    const exist = this.data.findIndex(x => {
      return x.search(title) !== -1;
    })

    if(exist === -1) {
      this.addData(value)
    } else {
      this.updateData(value, exist);
    }

    if(e.target.value === '') {
      this.data.splice(exist, 1); 
    }

    this.values[title] = e.target.value;

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

  getParamsFromUrl(url: string) {
    const position = url.indexOf('?');
    if(position === -1) {
      return ''
    } else {
      return url.slice(position + 1);
    }
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