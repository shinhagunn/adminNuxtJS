<template>
  <!-- 2 -->
  <div class="loading-comp">
    <h2 class="empty">Empty Page</h2>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
.loading-comp{
  position: absolute;
  top: 0;
  right: 0;
  left: 15%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty{
  color: #bbb;
}

</style>