<template>
  <div class="box-container">
    <div class="table-header">
      <h3>Tambah Mata Kuliah</h3>
      <hr class="divider" />
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nama Mata Kuliah</label>
        <input v-model="formData.name" type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3">
        <label for="subjects_id" class="form-label">Kode Mata Kuliah</label>
        <input
          v-model="formData.subjects_id"
          type="text"
          class="form-control"
          id="subjects_id"
          name="subjects_id"
        />
      </div>
      <div class="mb-3">
        <label for="credits" class="form-label">SKS</label>
        <input
          v-model="formData.credits"
          type="text"
          class="form-control"
          id="credits"
          name="credits"
        />
      </div>
      <div class="mb-3">
        <label for="lecturers" class="form-label">Dosen Pengajar</label>
        <select v-model="formData.lecturers_id" class="form-select" id="lecturers" name="lecturers">
          <option
            v-for="lecturer in lecturersWithoutSubjects"
            :key="lecturer.id"
            :value="lecturer.id"
          >
            {{ lecturer.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Tambah</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import { addMatKul } from '@/services/mataKuliah-api'
import { useRouter } from 'vue-router'
import { getDosenWithoutMatKul } from '@/services/dosen-api'
import { useToast } from 'vue-toastification'

export default {
  name: 'MataKuliahAdd',
  setup() {
    const router = useRouter()
    const formData = ref({
      name: '',
      subjects_id: '',
      credits: '',
      lecturers_id: ''
    })

    const lecturersWithoutSubjects = ref([])
    const toast = useToast()

    const fetchDataDosen = async () => {
      try {
        const data = await getDosenWithoutMatKul()
        if (data) {
          lecturersWithoutSubjects.value = data
        } else {
          toast.error(data)
        }
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to fetch data')
      }
    }

    const handleSubmit = async () => {
      try {
        const data = await addMatKul(formData.value)

        formData.value = {
          name: '',
          subjects_id: '',
          credits: '',
          lecturers_id: ''
        }

        toast.success(data.message)
        router.push({ name: 'MataKuliahPage' })
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to add data')
      }
    }

    onMounted(() => {
      fetchDataDosen()
    })

    watchEffect(() => {
      const newValue = formData.lecturers_id
      const selectedLecturer = lecturersWithoutSubjects.value.find(
        (lecturer) => lecturer.id === newValue
      )

      if (selectedLecturer) {
        formData.lecturers_id = selectedLecturer
      }
    })

    return {
      formData,
      lecturersWithoutSubjects,
      handleSubmit
    }
  }
}
</script>
