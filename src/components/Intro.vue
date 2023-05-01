<template>
  <div class="intro">
    <img src="../../static/img/icons/space-shuttle.png" />
    <div class="text">
      <h3>Ryan Deyo</h3>
      <h6>Data Scientist ● Software Engineer</h6>
    </div>
  </div>
</template>

<script></script>

<style scoped>

  .intro {
    display: flex;
    flex-direction: row;
    padding: 20px;
    height: 100px;
    /* background: #111111; */
    background: linear-gradient(rgb(0, 11, 90) 0%, #111111 100%);
  }
  .intro .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 20px 0 20px;
  }
  .intro .text h3, .intro .text h6 {
    margin: 0;
  }

</style>
