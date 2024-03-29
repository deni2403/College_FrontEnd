<template>
  <div class="box-container">
    <div class="table-header">
      <h3>Edit Mata Kuliah</h3>
      <hr class="divider" />
    </div>
    <form @submit.prevent="updateData">
      <div class="mb-3">
        <label for="name" class="form-label">Nama Mata Kuliah</label>
        <input v-model="dataMatKul.name" type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3">
        <label for="subjects_id" class="form-label">Kode Mata Kuliah</label>
        <input
          v-model="dataMatKul.subjects_id"
          type="text"
          class="form-control"
          id="subjects_id"
          name="subjects_id"
        />
      </div>
      <div class="mb-3">
        <label for="credits" class="form-label">SKS</label>
        <input
          v-model="dataMatKul.credits"
          type="text"
          class="form-control"
          id="credits"
          name="credits"
        />
      </div>
      <div class="mb-3">
        <label for="currentLecturers" class="form-label">Dosen Pengajar</label>
        <input
          v-if="dataMatKul.lecturers"
          v-model="dataMatKul.lecturers.name"
          type="text"
          class="form-control"
          id="currentLecturers"
          name="currentLecturers"
          disabled
        />
        <input
          v-else
          value="N/A"
          type="text"
          disabled
          class="form-control"
          id="currentLecturers"
          name="currentLecturers"
        />
      </div>
      <div class="mb-3">
        <label for="lecturers" class="form-label">Ganti dengan Dosen</label>
        <select
          v-model="dataMatKul.lecturers_id"
          class="form-select"
          id="lecturers"
          name="lecturers"
        >
          <option
            v-for="lecturer in lecturersWithoutSubjects"
            :key="lecturer.id"
            :value="lecturer.id"
          >
            {{ lecturer.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMatKulById, updateMatKul } from '@/services/mataKuliah-api'
import { getDosenWithoutMatKul } from '@/services/dosen-api'
import { useToast } from 'vue-toastification'

export default {
  name: 'MataKuliahEdit',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const dataMatKul = ref({
      name: '',
      subjects_id: '',
      credits: '',
      lecturers_id: '',
      lecturers: {
        name: ''
      }
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
        toast.error('Failed to load Dosen data')
      }
    }

    const fetchData = async () => {
      try {
        const id = route.params.id
        const data = await getMatKulById(id)
        if (data) {
          Object.assign(dataMatKul.value, data)
        } else {
          toast.error(data)
        }
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to load data')
      }
    }

    const updateData = async () => {
      try {
        const data = await updateMatKul(dataMatKul.value)

        toast.success(data.message)
        router.push({ name: 'MataKuliahPage' })
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to update data')
      }
    }

    onMounted(() => {
      fetchData()
      fetchDataDosen()
    })

    watchEffect(() => {
      const newValue = dataMatKul.lecturers_id
      const selectedLecturer = lecturersWithoutSubjects.value.find(
        (lecturer) => lecturer.id === newValue
      )

      if (selectedLecturer) {
        dataMatKul.lecturers_id = selectedLecturer
      }
    })

    return {
      dataMatKul,
      lecturersWithoutSubjects,
      updateData
    }
  }
}
</script>
