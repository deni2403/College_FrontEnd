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
import { useToast } from 'vue-toastification'

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

    const toast = useToast()

    const fetchAvailableMatKul = async () => {
      try {
        const data = await getAvailableMatkul(id)
        availableMatkul.value = data
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to load data')
      }
    }

    const fetchDataMhs = async () => {
      try {
        const data = await getById(id)
        dataMhs.value = data
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to load mahasiswa data')
      }
    }

    const handleSubmit = async () => {
      try {
        const data = await assignMatKul(formData.value)

        toast.success(data.message)
        router.push({ name: 'RekapAkademikPage' })
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to add data')
      }
    }

    onMounted(() => {
      fetchAvailableMatKul()
      fetchDataMhs()
    })

    watchEffect(() => {
      const selectedMatkul = availableMatkul.value.find(
        (matKul) => matKul.id === formData.value.subjects_id
      )

      if (selectedMatkul && selectedMatkul.lecturers) {
        selectedSubjectLecturer.value = selectedMatkul.lecturers.name || ''
      } else {
        selectedSubjectLecturer.value = 'N/A'
      }
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
