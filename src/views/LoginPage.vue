<template>
  <div class="login-wrapper">
    <div class="login shadow-sm">
      <div class="login-header d-flex flex-column align-items-center">
        <h1 class="login-header__title">Welcome</h1>
        <p class="login-header__text">Please Login Here .</p>
      </div>
      <div class="login-form">
        <form @submit.prevent="login">
          <div class="mb-4">
            <input
              type="text"
              class="form-control"
              name="text"
              id="text"
              placeholder="Username"
              v-model="username"
              autocomplete="off"
            />
          </div>
          <div class="mb-2 pass-container">
            <input
              type="password"
              class="form-control password-input"
              name="password"
              id="password"
              placeholder="Password"
              ref="passwordInput"
              v-model="password"
            />
            <button type="button" class="show-btn" @click="togglePassword">
              <i
                :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
                style="color: #545454"
              ></i>
            </button>
          </div>
          <div
            class="d-flex button-container justify-content-center align-items-center flex-column"
          >
            <button type="submit" class="login-btn">Login</button>
            <router-link :to="{ name: 'RegisterPage' }" class="register-link">Register</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../services/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const showPassword = ref(false)
    const username = ref('')
    const password = ref('')
    const passwordInput = ref(null)
    const toast = useToast()

    const togglePassword = () => {
      showPassword.value = !showPassword.value

      if (showPassword.value) {
        passwordInput.value.type = 'text'
      } else {
        passwordInput.value.type = 'password'
      }
    }

    const login = async () => {
      try {
        const credentials = {
          username: username.value,
          password: password.value
        }

        await auth.login(credentials)
        router.push('/')
      } catch (error) {
        console.error('Login error', error)
        toast.error('username or password is incorrect', {
          position: 'top-center'
        })
      }
    }

    return {
      showPassword,
      username,
      password,
      passwordInput,
      togglePassword,
      login
    }
  }
}
</script>
