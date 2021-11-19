<template>
  <!-- 2 -->
  <div class="loading-comp">
    <h2>Loading ...</h2>
    <div class="loader loader--style2">
      <svg
        id="loader-1"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
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
  .loader {
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
  }
  
  /*
      Set the color of the icon
      */
  svg path,
  svg rect {
    fill: #ff6700;
  }
}

</style>