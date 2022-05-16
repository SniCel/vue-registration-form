<template>
  <div class="view view--home">
    <RegistrationForm />
  </div>
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue'

export default {
  name: 'HomeView',
  components: {
    RegistrationForm
  }
}
</script>
