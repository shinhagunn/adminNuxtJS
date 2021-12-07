<template>
  <div class="filter-text">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class DropDown extends Vue {
  @Prop({ default: '' }) readonly value!: string;

  show = false;
  hoverQueue: NodeJS.Timeout | null = null;

  onTriggerClick() {
    if (this.hoverQueue) {
      clearTimeout(this.hoverQueue)
    }

    this.hoverQueue = setTimeout(() => {
      this.show = !this.show;
    }, 200)
  }

  onTriggerOut() {
    if (this.hoverQueue) {
      clearTimeout(this.hoverQueue)
    }

    this.hoverQueue = setTimeout(() => {
      this.show = false;
    }, 200)
  }

  handleData(){
    this.$emit('handleChangeData');
  }
}
</script>

<style lang="less">
.filter-text {
  input{
    padding: 8px;
    max-width: 200px;
    height: 36px;
    border: 1px solid rgba(43, 43, 43, 0.2);
    border-radius: 3px;
    transition: all 0.3s;
    font-size: 16px;

    &:hover {
      border: 1px solid #007bff;
    }

    &:focus {
      outline: none;
      border: 1px solid #007bff;
    }
  }
}
</style>
