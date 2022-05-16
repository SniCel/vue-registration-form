<template>
  <button
    :class="[
      'switch-btn',
      {'switch-btn--on': privateProfile},
      {'switch-btn--off': !privateProfile}
    ]"
    type="button"
    @click="clickHandler"
  >
    <span class="switch-btn__text">{{ privateProfile ? 'YES' : 'NO' }}</span>
    <span class="switch-btn__box"></span>
  </button>
</template>

<script>
export default {
  name: 'SwitchBtn',
  data () {
    return {
      privateProfile: false
    }
  },
  methods: {
    clickHandler () {
      this.privateProfile = !this.privateProfile
    }
  }
}
</script>

<style scoped lang="scss">
  .switch-btn {
    min-width: rem(60px);
    height: rem(30px);
    border-radius: rem(10px);
    border: none;
    padding: rem(3px);
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: all 300ms;
    &--off {
      background: #F2F5F8;
    }
    &--on {
      background: #004EEF;
    }
    &:focus {
      outline: none;
      box-shadow: 0px 2px 5px rgb(0 0 0 / 20%);
    }
    &__text {
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: rem(11px);
      line-height: rem(11px);
      .switch-btn--on & {
        color: #fff;
        padding-right: rem(25px);
        padding-left: rem(9px);
      }
      .switch-btn--off & {
        color: #76879E;
        padding-right: rem(9px);
        padding-left: rem(25px);
      }
    }
    &__box {
      display: block;
      width: rem(19px);
      height: calc(100% - 6px);
      box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12);
      border-radius: rem(7px);
      background: #fff;
      position: absolute;
      top: rem(3px);
      transition: all 300ms;
      .switch-btn--off & {
        color: #fff;
        left: rem(4px);
      }
      .switch-btn--on & {
        color: #fff;
        left: calc(100% - 22px);
        background: #F1F3F5;
      }
    }
  }
</style>
