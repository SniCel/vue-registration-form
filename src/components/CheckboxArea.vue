<template>
  <div
    :class="[
      'checkbox-area',
      {'checkbox-area--checked': privacyPolicy},
      {'checkbox-area--text': text.length},
      {'checkbox-area--error': error}
    ]"
  >
    <button class="checkbox-area__input" type="button" >
      <img
        :class="['checkbox-area__mark', {'checkbox-area__mark--checked': privacyPolicy}]"
        src="@/assets/global/img/svg/check-mark.svg"
        alt="check mark"
      >
    </button>
    <p v-if="text.length" class="checkbox-area__text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'CheckboxArea',
  props: {
    text: {
      type: String,
      default: ''
    },
    privacyPolicy: {
      type: Boolean
    },
    error: {
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss">
  .checkbox-area {
    cursor: default;
    background: none;
    border: none;
    &:hover:not(.checkbox-area--checked) {
      .checkbox-area__input {
        background: #F6F8FA;
        border: 1px solid #D5DBE2;
      }
    }
    &--text {
      display: grid;
      grid-template-columns: min-content auto;
      grid-gap: rem(17px);
      align-items: center;
      text-align: left;
    }
    &__input {
      width: rem(22px);
      height: rem(22px);
      border-radius: rem(6px);
      background: #F2F5F8;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid transparent;
      transition: border 300ms;
      position: relative;
      overflow: hidden;
      .checkbox-area--checked & {
        background: #004EEF;
      }
      &:focus {
        outline: none;
        box-shadow: 0px 2px 5px rgb(0 0 0 / 20%);
      }
    }
    &__mark {
      transition: all 400ms;
      transform: scale(0);
      &--checked {
        transform: scale(1);
      }
    }
    &__text {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(14px);
      line-height: 170%;
      color: #31425A;
      .checkbox-area--error & {
        color: #F43C3C;
      }
    }
  }
</style>
