<template>
  <div class="box-container">
    <div class="table-header">
      <h3>Edit Data Dosen</h3>
      <hr class="divider" />
    </div>
    <form @submit.prevent="updateData">
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input v-model="dataDosen.name" type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="mb-3">
        <label for="lecturers_id" class="form-label">NIP</label>
        <input
          v-model="dataDosen.lecturers_id"
          type="text"
          class="form-control"
          id="lecturers_id"
          name="lecturers_id"
        />
      </div>
      <div class="mb-3">
        <label for="field" class="form-label">Bidang</label>
        <input v-model="dataDosen.field" type="text" class="form-control" id="field" name="field" />
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Jenis Kelamin</label>
        <select v-model="dataDosen.gender" class="form-select" id="gender" name="gender">
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
import { getDosenById, updateDosen } from '@/services/dosen-api'
import { useToast } from "vue-toastification";

export default {
  name: 'DosenEdit',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const dataDosen = ref({
      name: '',
      lecturers_id: '',
      field: '',
      gender: ''
    })

    const toast = useToast()

    const fetchData = async () => {
      try {
        const id = route.params.id
        const data = await getDosenById(id)

        if (data) {
          Object.assign(dataDosen.value, data)
        } else {
          toast.error(data)
        }
      } catch (error) {
        console.error('error', error)
        toast.error("Failed to load Data")
      }
    }

    const updateData = async () => {
      try {
        const data = await updateDosen(dataDosen.value)

        toast.success(data.message)
        router.push({ name: 'DosenPage' })
      } catch (error) {
        console.error(error)
        toast.error("Failed to update Data")
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      dataDosen,
      updateData
    }
  }
}
</script>
