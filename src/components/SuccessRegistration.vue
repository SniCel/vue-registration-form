<template>
  <div class="success-registration">
    <div class="success-registration__mark">
      <img src="@/assets/global/img/svg/check-mark-large.svg" alt="success icon">
    </div>
    <h2 class="success-registration__heading">
      Success registration
    </h2>
    <p class="success-registration__desc">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis gravida ex, at maximus
      lorem condimentum ut. Cras purus mauris, convallis vitae sollicitudin sed, fringilla lobortis lorem.
    </p>
  </div>
</template>

<script>
export default {
  name: 'SuccessRegistration'
}
</script>

<style scoped lang="scss">
  .success-registration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #fff;
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-content: center;
    padding: 0 rem(179px);
    &__mark {
      width: rem(108px);
      height: rem(108px);
      background: #17BA87;
      box-shadow: 0px 17px 31px rgba(44, 202, 117, 0.25);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto rem(32px) auto;
    }
    &__heading {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(60px);
      line-height: rem(66px);
      color: #333;
      margin-bottom: rem(14px);
    }
    &__desc {
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      font-size: rem(18px);
      line-height: 175%;
      color: #76879E;
      letter-spacing: 0.02rem;
    }
  }
</style>
