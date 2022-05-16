<template>
  <section class="registration-form">
    <div :class="['registration-form__success-msg', {'registration-form__success-msg--show': successMsg}]">
      <SuccessRegistration />
    </div>
    <h1 class="registration-form__heading">Registration Form</h1>
    <form class="registration-form__form-area" @submit="formSubmitHandler" novalidate>
      <div class="registration-form__row">
        <InputArea type="email" placeholder="Email*" v-model="form.email" :error="v$.form.email.$error" />
      </div>
      <InputArea type="text" placeholder="First Name*" v-model="form.firstName" :error="v$.form.firstName.$error" />
      <InputArea type="text" placeholder="Second Name*" v-model="form.secondName" :error="v$.form.secondName.$error" />
      <DropdownArea type="language" placeholder="Language" />
      <DropdownArea type="country" placeholder="Country" />
      <InputArea type="password" placeholder="Password*" v-model="form.password" :error="v$.form.password.$error" />
      <InputArea
        type="password"
        placeholder="Confirm Password*"
        v-model="form.confirmPassword"
        :error="v$.form.confirmPassword.$error"
      />
      <div class="registration-form__row registration-form__row--profile">
        <h4 class="registration-form__secondary-text">Private Profile</h4>
        <SwitchBtn />
      </div>
      <div class="registration-form__row">
        <div class="registration-form__hr"></div>
      </div>
      <div class="registration-form__row registration-form__row--signup">
        <SignupBtn />
        <CheckboxArea
          text="Creating an account means you’re okay with our Privacy Policy.*"
          @click="clickHandlerPrivacyPolicy"
          :privacy-policy="form.privacyPolicy"
          :error="v$.form.privacyPolicy.$error"
        />
      </div>
    </form>
  </section>
</template>

<script>
import CheckboxArea from '@/components/CheckboxArea'
import InputArea from '@/components/InputArea'
import SwitchBtn from '@/components/SwitchBtn'
import SignupBtn from '@/components/SignupBtn'
import DropdownArea from '@/components/DropdownArea'
import SuccessRegistration from '@/components/SuccessRegistration'
import { email, required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  name: 'RegistrationForm',
  components: {
    DropdownArea,
    CheckboxArea,
    SignupBtn,
    InputArea,
    SwitchBtn,
    SuccessRegistration
  },
  data () {
    return {
      form: {
        email: '',
        firstName: '',
        secondName: '',
        password: '',
        confirmPassword: '',
        language: '',
        country: '',
        privacyPolicy: false
      },
      successMsg: false
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  validations () {
    return {
      form: {
        email: { required, email },
        firstName: { required, minLength: minLength(2), maxLength: maxLength(100) },
        secondName: { required, minLength: minLength(2), maxLength: maxLength(100) },
        password: { required, minLength: minLength(5) },
        confirmPassword: { sameAsRawValue: sameAs(this.form.password) },
        privacyPolicy: { checked: value => value === true }
      }
    }
  },
  methods: {
    clickHandlerPrivacyPolicy () {
      this.form.privacyPolicy = !this.form.privacyPolicy
    },
    formSubmitHandler (e) {
      e.preventDefault()
      this.v$.$validate()
      if (!this.v$.$invalid) {
        // ************************
        // @todo
        // POST request
        // ***********************
        this.successMsg = true
        setTimeout(() => { this.successMsg = false }, 5000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .registration-form {
    max-width: rem(874px);
    background: #fff;
    border-radius: rem(25px);
    padding: rem(25px) rem(20px) rem(20px) rem(20px);
    position: relative;
    overflow: hidden;
    @media only screen and (min-width: 900px) {
      padding: rem(94px) rem(106px) rem(140px) rem(106px);
    }
    &__heading {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(30px);
      line-height: rem(39px);
      color: #333333;
      text-align: left;
      margin-bottom: rem(29px);
      @media only screen and (min-width: 768px) {
        font-size: rem(60px);
        line-height: rem(70px);
        margin-bottom: rem(58px);
        text-align: center;
      }
    }
    &__row {
      grid-column: 1/-1;
      &--profile {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &--signup {
        display: grid;
        grid-gap: rem(30px);
        align-items: center;
        @media only screen and (min-width: 768px) {
          grid-template-columns: rem(268px) auto;
          grid-gap: rem(37px);
          justify-content: space-between;
        }
        > button {
          @media only screen and (max-width: 768px) {
            order: 2;
          }
        }
      }
    }
    &__form-area {
      display: grid;
      grid-gap: rem(20px);
      @media only screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: rem(26px);
      }
    }
    &__hr {
      width: 100%;
      height: 1px;
      background: #F1F3F5;
    }
    &__secondary-text {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: rem(16px);
      color: #1C2D41;
    }
    &__success-msg {
      position: absolute;
      top: -100%;
      left: 0;
      transition: all 600ms;
      z-index: 10;
      width: 100%;
      height: 100%;
      &--show {
        top: 0;
      }
    }
  }
</style>
