<template>
  <!-- 2 -->
  <div class="loading-comp">
    <h2 class="empty">Empty 
    </h2>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
.loading-comp{
  position: absolute;
  top: 20px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty{
  color: #bbb;
}

</style>