import { createRouter, createWebHistory } from 'vue-router'
import MahasiswaPage from '../views/mahasiswa/Mahasiswa.vue'
import MahasiswaAdd from '../views/mahasiswa/MahasiswaAdd.vue'
import MahasiswaEdit from '../views/mahasiswa/MahasiswaEdit.vue'
import DosenPage from '../views/dosen/Dosen.vue'
import DosenAdd from '../views/dosen/DosenAdd.vue'
import DosenEdit from '../views/dosen/DosenEdit.vue'
import MataKuliahPage from '../views/mataKuliah/Matkul.vue'
import MataKuliahAdd from '../views/mataKuliah/MatkulAdd.vue'
import MataKuliahEdit from '../views/mataKuliah/MatkulEdit.vue'
import LoginPage from '../views/LoginPage.vue'
import auth from '@/services/auth'
import AkademikPage from '@/views/rekapAkademik/Akademik.vue'
import AkademikAdd from '@/views/rekapAkademik/AkademikAdd.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/',
      redirect: '/mahasiswa',
      meta: { requiresAuth: true }
    },
    {
      path: '/mahasiswa',
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'MahasiswaPage', component: MahasiswaPage },
        { path: 'add', name: 'MahasiswaAdd', component: MahasiswaAdd },
        { path: 'edit/:id', name: 'MahasiswaEdit', component: MahasiswaEdit }
      ]
    },
    {
      path: '/dosen',
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'DosenPage', component: DosenPage },
        { path: 'add', name: 'DosenAdd', component: DosenAdd },
        { path: 'edit/:id', name: 'DosenEdit', component: DosenEdit }
      ]
    },
    {
      path: '/mata-kuliah',
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'MataKuliahPage', component: MataKuliahPage },
        { path: 'add', name: 'MataKuliahAdd', component: MataKuliahAdd },
        { path: 'edit/:id', name: 'MataKuliahEdit', component: MataKuliahEdit }
      ]
    },
    {
      path: '/rekap-akademik',
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'RekapAkademikPage', component: AkademikPage },
        { path: 'add/:id', name: 'RekapAkademikAdd', component: AkademikAdd }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authenticated = await auth.isAuthenticated()
    if (!authenticated) {
      return next('/login')
    }
  }
  next()
})

export default router
