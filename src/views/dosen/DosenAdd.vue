<template>
  <div class="box-container">
    <div class="table-header">
      <h3>Tambah Data Dosen</h3>
      <hr class="divider" />
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input v-model="formData.name" type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3">
        <label for="lecturers_id" class="form-label">NIP</label>
        <input
          v-model="formData.lecturers_id"
          type="text"
          class="form-control"
          id="lecturers_id"
          name="lecturers_id"
        />
      </div>
      <div class="mb-3">
        <label for="field" class="form-label">Bidang</label>
        <input v-model="formData.field" type="text" class="form-control" id="field" name="field" />
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Jenis Kelamin</label>
        <select v-model="formData.gender" class="form-select" id="gender" name="gender">
          <option value="Male">Pria</option>
          <option value="Female">Wanita</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Tambah</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addDosen } from '@/services/dosen-api'

export default {
  name: 'DosenAdd',
  setup() {
    const router = useRouter()
    const formData = ref({
      name: '',
      lecturers_id: '',
      field: '',
      gender: ''
    })

    const handleSubmit = async () => {
      try {
        await addDosen(formData.value)

        formData.value = {
          name: '',
          lecturers_id: '',
          field: '',
          gender: ''
        }

        router.push({ name: 'DosenPage' })
      } catch (error) {
        console.log('error', error)
      }
    }

    return {
      formData,
      handleSubmit
    }
  }
}
</script>
