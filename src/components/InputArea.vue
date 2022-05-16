<template>
  <div
    :class="[
      'input-area',
      `input-area--${type}`,
      {'input-area--focused': focused},
      {'input-area--not-empty': modelValue.length},
      {'input-area--error': error}
    ]"
  >
    <div class="input-area__inner-wr">
      <span class="input-area__type">{{ placeholder }}</span>
      <input
        class="input-area__content"
        :type="type"
        @focusin="focusHandler(true)"
        @focusout="focusHandler(false)"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <img
        v-if="type === 'password'"
        class="input-area__password-icon"
        src="@/assets/global/img/svg/password.svg"
        alt="password"
      />
    </div>
    <p v-if="error" class="input-area__error-message">
      <template v-if="type === 'email'">{{ errorMessages.email }}</template>
      <template v-if="type === 'text'">{{ errorMessages.text }}</template>
      <template v-if="type === 'password'">{{ errorMessages.password }}</template>
    </p>
  </div>
</template>

<script>
export default {
  name: 'InputArea',
  props: {
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean
    }
  },
  data () {
    return {
      focused: false,
      errorMessages: {
        email: 'Please enter a valid email',
        text: 'Character limit is between 2 - 100',
        password: 'Your password must be at least 5 characters long and must match'
      }
    }
  },
  methods: {
    focusHandler (data) {
      this.focused = data
    }
  }
}
</script>

<style scoped lang="scss">
  .input-area {
    &__inner-wr {
      border: 1px solid transparent;
      height: rem(64px);
      position: relative;
      display: block;
      border-radius: rem(14px);
      width: 100%;
      overflow: hidden;
      transition: all 200ms;
      &::before {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 0%;
        height: rem(2px);
        background: #004EEF;
        transition: all 300ms;
        .input-area--error & {
          background: #F43C3C;
        }
      }
      .input-area--error & {
        border: 1px solid #F43C3C;
      }
      .input-area:not(.input-area--focused) & {
        &:hover {
          border: 1px solid #D5DBE2;
        }
      }
      .input-area--focused & {
        &::before {
          width: 100%;
        }
      }
      .input-area--not-empty:not(.input-area--focused) & {
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      }
      //.input-area:not(.input-area--focused) & {
      //  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      //}
    }
    &__type {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(16px);
      color: #76879E;
      position: absolute;
      left: rem(18px);
      top: 50%;
      transform: translate(0, -50%);
      transition: all 300ms;
      pointer-events: none;
      .input-area--focused &,
      .input-area--not-empty & {
        font-size: 12px;
        top: rem(13px);
        transform: none;
      }
    }
    &__password-icon {
      position: absolute;
      top: calc(50% - 10px);
      right: rem(25px);
      pointer-events: none;
    }
    &__content {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(16px);
      background: #F6F8FA;
      color: #76879E;
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 rem(18px);
      &:hover,
      &:focus {
        outline: none;
      }
      .input-area--focused &,
      .input-area--not-empty & {
        padding-top: rem(20px);
        color: #1B2C45;
      }
      .input-area--not-empty:not(.input-area--focused) & {
        background: #fff;
      }
      .input-area--error & {
        color: #F43C3C;
      }
      .input-area--password & {
        padding-right: rem(60px);
      }
    }
    &__error-message {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(16px);
      color: #F43C3C;
      padding-left: rem(18px);
      margin-top: rem(5px);
    }
  }
</style>
