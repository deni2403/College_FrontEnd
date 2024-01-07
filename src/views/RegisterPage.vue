<template>
  <div class="login-wrapper">
    <div class="login shadow-sm">
      <div class="login-header d-flex flex-column align-items-center">
        <h1 class="login-header__title">Welcome</h1>
        <p class="login-header__text">Register Here .</p>
      </div>
      <div class="login-form">
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <input
              type="text"
              class="form-control"
              name="username"
              id="username"
              placeholder="Username"
              v-model="data.username"
            />
          </div>
          <div class="mb-4">
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              placeholder="Name"
              v-model="data.name"
            />
          </div>
          <div class="mb-2 pass-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control password-input"
              name="password"
              id="password"
              placeholder="Password"
              v-model="data.password"
            />
            <button type="button" class="show-btn" @click="togglePassword">
              <i
                :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"
                style="color: #545454"
              ></i>
            </button>
          </div>
          <div
            class="d-flex register-button-container justify-content-center align-items-center flex-column"
          >
            <button type="submit" class="login-btn">Register</button>
            <router-link :to="{ name: 'LoginPage' }" class="register-link"
              >Already Registered? Login.</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../services/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const data = ref({
      username: '',
      name: '',
      password: ''
    })

    const showPassword = ref(false)
    const toast = useToast()

    const handleRegister = async () => {
      try {
        await auth.registerUser(data.value)

        toast.success('Register Success', {
          position: 'top-center'
        })
        router.push('/login')
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to register', {
          position: 'top-center'
        })
      }
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    return {
      data,
      handleRegister,
      togglePassword,
      showPassword
    }
  }
}
</script>
