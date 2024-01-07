<template>
  <div class="box-container">
    <div class="table-header">
        <h3>Tambah Data Mahasiswa</h3>
        <hr class="divider" />
      </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input v-model="formData.name" type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3">
        <label for="students_id" class="form-label">NIM</label>
        <input
          v-model="formData.students_id"
          type="text"
          class="form-control"
          id="students_id"
          name="students_id"
        />
      </div>
      <div class="mb-3">
        <label for="major" class="form-label">Jurusan</label>
        <input v-model="formData.major" type="text" class="form-control" id="major" name="major" />
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
import { addMhs } from '@/services/mahasiswa-api'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification";


export default {
  name: 'MahasiswaAdd',
  setup() {
    const router = useRouter()
    const formData = ref({
      name: '',
      students_id: '',
      major: '',
      gender: ''
    })

    const toast = useToast()

    const handleSubmit = async () => {
      try {
        const data = await addMhs(formData.value)

        formData.value = {
          name: '',
          students_id: '',
          major: '',
          gender: ''
        }
        toast.success(data.message)
        router.push({ name: 'MahasiswaPage' })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      formData,
      handleSubmit
    }
  }
}
</script>
