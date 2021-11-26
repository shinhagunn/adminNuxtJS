<template>
  <div class="dropdown" @mouseover="onTriggerHover" @mouseleave="onTriggerBlur">
    <div class="z-dropdown-trigger">
      <slot />
    </div>
    <transition :name="`dropdown-${placement}`">
      <div v-if="hover" :class="['dropdown-overlay', `dropdown-${placement}-overlay`]">
        <slot name="overlay" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class DropDown extends Vue {
  @Prop({ default: 'bottomCenter' }) readonly placement!: string;

  hover = false;
  hoverQueue: NodeJS.Timeout | null = null;

  onTriggerHover() {
    if (this.hoverQueue) {
      clearTimeout(this.hoverQueue)
    }

    this.hoverQueue = setTimeout(() => {
      this.hover = true;
    }, 200)
  }

  onTriggerBlur() {
    if (this.hoverQueue) {
      clearTimeout(this.hoverQueue)
    }

    this.hoverQueue = setTimeout(() => {
      this.hover = false;
    }, 200)
  }
}
</script>

<style lang="less">
.dropdown {
  position: relative;

  &-trigger {
    height: 100%;
    z-index: 1;
  }

  &-overlay {
    opacity: 1;
    position: absolute;
    margin: 5px 0;
    box-shadow: 0 1px 6px 0 hsl(0deg 0% 100% / 10%);
    transition: all 0.3s;
    z-index: 999;
  }

  &-bottomLeft {
    &-overlay {
      transform: translate(0, 0);
      top: 100%;
      left: 0;
    }

    &-enter,
    &-leave-active {
      opacity: 0;
      left: 0;
      top: 50%;
      transform: translateX(0);
    }
  }

  &-bottomCenter {
    &-overlay {
      transform: translate(-50%, 0);
      top: 100%;
      left: 50%;
    }

    &-enter,
    &-leave-active {
      opacity: 0;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
    }
  }

  &-bottomRight {
    &-overlay {
      transform: translate(-100%, 0);
      top: 100%;
      left: 100%;
    }

    &-enter,
    &-leave-active {
      opacity: 0;
      left: 100%;
      top: 50%;
      transform: translateX(-100%);
    }
  }

  .z-menu {
    display: block;
    margin: 0;
    outline: none;
    min-width: 150px;
    padding: 8px 0;
    background-color: var(--dropdown-background);
    text-align: left;

    &-item {
      line-height: 45px;
      padding-left: 16px;
      font-size: 14px;
      margin: 0;
      color: var(--white-color);
      user-select: none;
      transition: 0.3s all;

      a {
        color: inherit;
      }

      &-selected, &:hover {
        color: var(--primary-color);
        background-color: rgba(0, 0, 0, 0.25);

        a {
          color: var(--white-color);
        }
      }
    }
  }
}
</style>
