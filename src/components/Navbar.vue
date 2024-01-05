<script>
import auth from '@/services/auth'

export default {
  name: 'Navbar',
  data() {
    return {
      username: ''
    };
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    logout() {
      auth.logout()
      this.$router.push({ name: 'LoginPage' })
    },
    async getCurrentUser() {
      try {
        const currentUser = await auth.getCurrentUser()
        this.username = currentUser.name 
      } catch (error) {
        console.error('Error fetching current user:', error)
      }
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'MahasiswaPage' }" class="nav-link">Mahasiswa</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'DosenPage' }" class="nav-link">Dosen</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'MataKuliahPage' }" class="nav-link">Mata Kuliah</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'RekapAkademikPage' }" class="nav-link"
              >Rekap Akademik</router-link
            >
          </li>
        </ul>
        <div class="ms-auto user-info">
          <span class="username-info me-3">Welcome, {{ username }}</span>
          <button type="button" @click="logout" class="btn btn-outline-danger text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
