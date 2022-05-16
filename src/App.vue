<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
  .app {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(118.87deg, #FFFFFF -17.53%, #E0EAF7 102.01%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: rem(20px) rem(20px);
    @media only screen and (min-width: 768px) {
      padding: rem(122px) rem(20px);
    }
  }
</style>
