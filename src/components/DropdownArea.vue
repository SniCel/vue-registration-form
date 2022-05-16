<template>
  <div
    :class="[
      'dropdown-area',
      {'dropdown-area--open': optionsMenu},
      {'dropdown-area--not-empty': selected.length}
    ]"
    @click="clickHandlerFullArea"
    v-click-outside="clickOutsideHandler"
    @keydown="keyDownHandler"
    tabindex="0"
  >
    <div class="dropdown-area__select">
      <!--   COUNTRY   -->
      <template v-if="type === 'country'">
        <div  class="dropdown-area__option-selected">
          <strong v-if="selected.length">{{ selected }}</strong>
          <span v-else>{{ placeholder }}</span>
          <img class="dropdown-area__arrow-down" src="@/assets/global/img/svg/arrow-down.svg" alt="arrow down">
        </div>
        <div
          v-show="optionsMenu"
          class="dropdown-area__options"
          ref="dropdownAreaOptions"
          @mouseover="selectedCountryHighlight = false"
        >
          <div
            v-for="country in countries"
            :key="country.name"
            :class="[
              'dropdown-area__option',
              {'dropdown-area__option--selected': selectedCountryHighlight && selected === country.name}
            ]"
            @click="setCountry(country.name)"
            :data-lang="country.name"
          >{{ country.name }}</div>
        </div>
      </template>

      <!--   LANGUAGE   -->
      <template v-if="type === 'language'">
        <div class="dropdown-area__option-selected">
          <strong v-if="selected.length">{{ selected }}</strong>
          <span v-else>{{ placeholder }}</span>
          <img class="dropdown-area__arrow-down" src="@/assets/global/img/svg/arrow-down.svg" alt="arrow down">
        </div>
        <div
          v-show="optionsMenu"
          class="dropdown-area__options"
          ref="dropdownAreaOptions"
          @mouseover="selectedLanguageHighlight = false"
        >
          <div
            v-for="language in languages"
            :key="language"
            :class="[
              'dropdown-area__option dropdown-area__option--lang',
              {'dropdown-area__option--selected': selectedLanguageHighlight && selected === language.text}
            ]"
            @click="setLanguage(language.text)"
            :data-lang="language.text"
          >
            <img v-if="language.id === 'slovak'" src="@/assets/global/img/svg/slovakia.svg" :alt="language.text">
            <img v-if="language.id === 'english'" src="@/assets/global/img/svg/english.svg" :alt="language.text">
            {{ language.text }}
          </div>
        </div>
      </template>
    </div>
    <p v-if="error" class="dropdown-area__error-message">
      <template v-if="type === 'email'">{{ errorMessages.dropdown }}</template>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DropdownArea',
  props: {
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    error: {
      type: Boolean
    }
  },
  data () {
    return {
      selected: '',
      selectedLanguageHighlight: true,
      languages: [
        { id: 'slovak', text: 'Slovak' },
        { id: 'english', text: 'English' }
      ],
      countries: [],
      selectedCountryHighlight: true,
      optionsMenu: false,
      errorMessages: {
        dropdown: 'You must select one option'
      }
    }
  },
  methods: {
    clickOutsideHandler () {
      this.optionsMenu = false
    },
    setLanguage (lang) {
      this.selected = lang
    },
    setCountry (country) {
      this.selected = country
    },
    clickHandlerFullArea () {
      this.selectedLanguageHighlight = true
      this.selectedCountryHighlight = true
      this.optionsMenu = !this.optionsMenu
    },
    keyDownHandler (e) {
      e.preventDefault()
      if (this.optionsMenu) {
        const arrowDown = e.keyCode === 40
        const arrowUp = e.keyCode === 38
        const enter = e.keyCode === 13
        const selected = this.$refs.dropdownAreaOptions.querySelector('.dropdown-area__option--selected')
        // Arrow down && selected
        if (arrowDown && selected && selected.nextElementSibling !== null) {
          selected.classList.remove('dropdown-area__option--selected')
          selected.nextElementSibling.classList.add('dropdown-area__option--selected')
          selected.nextElementSibling.scrollIntoView({ behavior: 'smooth' })
          this.selected = selected.nextElementSibling.dataset.lang.toString()
        }
        // Arrow down && unselected
        if (arrowDown && selected === null && !this.selected.length) {
          const firstElement = this.$refs.dropdownAreaOptions.firstElementChild
          firstElement.classList.add('dropdown-area__option--selected')
          firstElement.scrollIntoView({ behavior: 'smooth' })
          this.selected = firstElement.dataset.lang.toString()
        }
        // Arrow up
        if (arrowUp && selected && selected.previousElementSibling !== null) {
          selected.classList.remove('dropdown-area__option--selected')
          selected.previousElementSibling.classList.add('dropdown-area__option--selected')
          selected.previousElementSibling.scrollIntoView({ behavior: 'smooth' })
          this.selected = selected.previousElementSibling.dataset.lang.toString()
        }
        // Enter
        if (enter) {
          this.optionsMenu = !this.optionsMenu
        }
      }
    }
  },
  mounted () {
    if (this.type === 'country') {
      fetch('https://restcountries.com/v2/all?fields=name')
        .then(response => response.json())
        .then(data => {
          this.countries = data
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .dropdown-area {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: rem(16px);
    background: #F6F8FA;
    color: #76879E;
    width: 100%;
    height: rem(64px);
    border: none;
    padding: 0 rem(28px) 0 rem(18px);
    border-radius: rem(14px);
    position: relative;
    display: flex;
    align-items: center;
    &:hover,
    &:focus {
      outline: none;
    }
    &--not-empty {
      background: #fff;
      box-shadow: 0px 2px 5px rgb(0 0 0 / 10%);
    }
    &--open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: #fff;
      box-shadow: 0px 12px 34px -12px rgba(0, 0, 0, 0.16);
      border-bottom: 1px solid #F2F5F8;
    }
    &__select {
      width: 100%;
    }
    &__options {
      position: absolute;
      box-shadow: 0px 12px 34px -12px rgba(0, 0, 0, 0.16);
      top: rem(64px);
      left: 0;
      z-index: 9;
      width: 100%;
      background: #fff;
      border-bottom-left-radius: rem(14px);
      border-bottom-right-radius: rem(14px);
      max-height: rem(160px);
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #31425A;
      }
    }
    &__option {
      padding: rem(15px) rem(18px);
      cursor: pointer;
      &:hover {
        background: #31425A;
        color: #fff;
      }
      &--selected {
        background: #31425A;
        color: #fff;
      }
      &--lang {
        display: flex;
        align-items: center;
        gap: rem(26px);
      }
    }
    &__option-selected {
      display: flex;
      justify-content: space-between;
      align-items: center;
      strong {
        color: #1B2C45;
      }
    }
    &__arrow-down {
      transition: transform 400ms;
      .dropdown-area--open & {
        transform: rotate(180deg);
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
