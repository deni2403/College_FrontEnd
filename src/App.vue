<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'LoginPage' || this.$route.name === 'RegisterPage'
    }
  },
}
</script>

<template>
  <header>
    <div class="wrapper">
      <Navbar v-if="!isLoginPage"/>
      <router-view></router-view>
    </div>
  </header>
</template>
