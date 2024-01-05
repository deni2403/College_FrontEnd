<template>
  <div class="page-container d-flex justify-content-center align-items-center">
     <div class="box-container container-fluid">
    <div class="table-header">
      <h3>Daftar Dosen</h3>
      <hr class="divider" />
    </div>
    <router-link :to="{ name: 'DosenAdd' }" class="btn btn-primary mb-3"
      >Add<i class="bi bi-plus"></i>
    </router-link>
    <div class="table-responsive">
      <table class="table table-striped text-center border">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>NIP</th>
            <th>Bidang</th>
            <th>Jenis Kelamin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dosen, index) in dataDosen" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ dosen.name }}</td>
            <td>{{ dosen.lecturers_id }}</td>
            <td>{{ dosen.field }}</td>
            <td>{{ dosen.gender }}</td>
            <td>
              <div>
                <router-link
                  :to="{ name: 'DosenEdit', params: { id: dosen.id } }"
                  class="btn btn-warning me-2"
                  ><i class="bi bi-pencil-fill"></i
                ></router-link>
                <button type="button" @click="handleDeleteDosen(dosen.id)" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAllDosen, deleteDosen as apiDeleteDosen } from '@/services/dosen-api'

export default {
  name: 'DosenPage',
  setup() {
    const dataDosen = ref([])

    const fetchData = async () => {
      try {
        const data = await getAllDosen()
        dataDosen.value = data
      } catch (error) {
        console.log('error', error)
      }
    }

    const handleDeleteDosen = async (id) => {
      try {
        await apiDeleteDosen(id)
        fetchData()
      } catch (error) {
        console.log('error', error)
      }
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      dataDosen,
      handleDeleteDosen
    }
  }
}
</script>
