<template>
  <div class="box-container">
    <div class="table-header">
        <h3>Ambil Mata Kuliah</h3>
        <hr class="divider" />
      </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nama Mahasiswa</label>
        <input
          v-model="dataMhs.name"
          type="text"
          disabled
          class="form-control"
          id="name"
          name="name"
        />
      </div>
      <div class="mb-3">
        <label for="students_id" class="form-label">NIM</label>
        <input
          v-model="dataMhs.students_id"
          type="text"
          disabled
          class="form-control"
          id="students_id"
          name="students_id"
        />
      </div>
      <div class="mb-3">
        <label for="subjects" class="form-label">Daftar Mata Kuliah</label>
        <select v-model="formData.subjects_id" class="form-select" id="subjects" name="subjects">
          <option v-for="matKul in availableMatkul" :key="matKul.id" :value="matKul.id">
            {{ matKul.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Dosen Mata Kuliah</label>
        <input
          v-model="selectedSubjectLecturer"
          type="text"
          disabled
          class="form-control"
          id="name"
          name="name"
        />
      </div>
      <button type="submit" class="btn btn-primary">Ambil</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAvailableMatkul, getById } from '../../services/mahasiswa-api.js'
import { assignMatKul } from '../../services/assigned-matkul-api.js'
import { getMatKulById } from '@/services/mataKuliah-api'

export default {
  name: 'AkademikAdd',
  setup() {
    const route = useRoute()
    const id = route.params.id
    const router = useRouter()

    const formData = ref({
      students_id: id,
      subjects_id: ''
    })

    const selectedSubjectLecturer = ref('')
    const availableMatkul = ref([])

    const dataMhs = ref({
      name: '',
      students_id: ''
    })

    const fetchAvailableMatKul = async () => {
      try {
        const data = await getAvailableMatkul(id)
        availableMatkul.value = data
      } catch (error) {
        console.log('error', error)
      }
    }

    const fetchDataMhs = async () => {
      try {
        const data = await getById(id)
        dataMhs.value = data
      } catch (error) {
        console.log('error', error)
      }
    }

    const handleSubmit = async () => {
      try {
        await assignMatKul(formData.value)
        router.push({ name: 'RekapAkademikPage' })
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      fetchAvailableMatKul()
      fetchDataMhs()
    })

    watchEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getMatKulById(formData.value.subjects_id)
          if (data.lecturers_id !== null && data.lecturers) {
            selectedSubjectLecturer.value = data.lecturers.name || ''
          } else {
            selectedSubjectLecturer.value = ''
          }
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchData()
    })

    return {
      availableMatkul,
      dataMhs,
      formData,
      handleSubmit,
      selectedSubjectLecturer
    }
  }
}
</script>
