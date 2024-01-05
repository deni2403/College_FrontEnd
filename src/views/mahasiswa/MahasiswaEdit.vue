<template>
  <div class="box-container">
    <div class="table-header">
      <h3>Edit Data Mahasiswa</h3>
      <hr class="divider" />
    </div>
    <form @submit.prevent="updateData">
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input v-model="dataMhs.name" type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3">
        <label for="students_id" class="form-label">NIM</label>
        <input
          v-model="dataMhs.students_id"
          type="text"
          class="form-control"
          id="students_id"
          name="students_id"
        />
      </div>
      <div class="mb-3">
        <label for="major" class="form-label">Jurusan</label>
        <input v-model="dataMhs.major" type="text" class="form-control" id="major" name="major" />
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Jenis Kelamin</label>
        <select v-model="dataMhs.gender" class="form-select" id="gender" name="gender">
          <option value="Male">Pria</option>
          <option value="Female">Wanita</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getById, updateMhs } from '../../services/mahasiswa-api'

export default {
  name: 'MahasiswaEdit',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const dataMhs = ref({
      name: '',
      students_id: '',
      major: '',
      gender: ''
    })

    const fetchData = async () => {
      try {
        const id = route.params.id
        const data = await getById(id)

        if (data) {
          Object.assign(dataMhs.value, data)
        } else {
          console.log('error', data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    const updateData = async () => {
      try {
        await updateMhs(dataMhs.value)
        router.push({ name: 'MahasiswaPage' })
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      dataMhs,
      updateData
    }
  }
}
</script>
