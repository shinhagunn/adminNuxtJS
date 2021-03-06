<template>
  <div class="z-notification-group">
    <transition-group class="z-notification-group-topRight" name="z-notification-group-topRight" tag="div">
      <template v-for="child in lstNotificationTopRight">
        <component :is="child" :key="child.options.key"></component>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import ZEventBus from "@/library/ZEventBus";
import { Placement } from "@/types";

@Component({})
export default class ZNotificationGroup extends Vue {
  childrens: any[] = [];

  get lstNotificationTopRight() {
    return this.childrens.filter(child => child.options.key.includes(Placement.TopRight))
  }

  mounted() {
    ZEventBus.on("z-new-notification", this.appendNewNotification)
    ZEventBus.on("z-remove-notification", (key: string) => {
      const index = this.childrens.findIndex(child => child.options.key === key)
      
      if (index === -1) return;
      this.childrens.splice(index, 1);
    })
  }

  beforeDestroy() {
    ZEventBus.remove("z-new-notification", this.appendNewNotification)
  }

  appendNewNotification(notification: any) {
    this.childrens.push(notification);
  }
}
</script>

<style lang="less">
.z-notification {
  position: relative;
  display: flex;
  padding: 16px 24px;
  margin-bottom: 16px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid rgba(140, 162, 214, 0.3);
  border-radius: 8px;
  box-shadow: 0 0 4px 5px rgba(140, 162, 214, 0.1);
  font-family: Arial, Helvetica, sans-serif;
  
  &-icon {
    margin-right: 12px;
    width: 4px;
    height: 48px;
    font-size: 20px;
    border-radius: 4px;

    &.text-down{
      background-color: #EB4E2C;
    }

    &.text-up{
      background-color: #3FBD60;
    }

    &.text-warn{
      background-color: #EE9500;
    }
  }
  
  &-group {
    &-topRight {
      width: 384px;
      position: fixed;
      top: 55px;
      right: 16px;
      opacity: 1;
  
      &-enter-active, &-leave-active {
        transition: all 0.3s;
      }
  
      &-enter, &-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  }
  
  &-title {
    display: inline-block;
    padding-right: 24px;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 8px;
    color: var(--white-color);
  }
  
  &-description {
    font-size: 14px;
    font-weight: normal;
    color: var(--action-color);
  }
  
  &-close {
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    right: 14px;
    color: var(--gray-color);
    transition: all 0.3s;
  
    &:hover {
      color: var(--action-color);
    }
  }
}
</style>