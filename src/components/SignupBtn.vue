<template>
  <button
    class="signup-btn"
    type="submit"
  >
    <span class="signup-btn__text">Sign up</span>
  </button>
</template>

<script>
export default {
  name: 'SignupBtn'
}
</script>

<style scoped lang="scss">
  .signup-btn {
    height: rem(62px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: rem(16px);
    line-height: rem(21px);
    color: #fff;
    width: 100%;
    padding: 0 rem(20px);
    border-radius: rem(16px);
    box-shadow: 0px 4px 14px rgba(0, 78, 239, 0.19);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transition: all 400ms;
    }
    &::before {
      opacity: 1;
      background: linear-gradient(269.72deg, #004EEF 0.1%, #8600EF 96.94%);
    }
    &:hover {
      &::before {
        transform: rotate(180deg);
      }
    }
    &:focus {
      outline: none;
      &::before {
        transform: rotate(180deg);
      }
    }
    &__text {
      position: relative;
      z-index: 1;
    }
  }
</style>
