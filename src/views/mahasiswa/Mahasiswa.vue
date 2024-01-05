<template>
  <div class="page-container d-flex justify-content-center align-items-center">
    <div class="box-container container-fluid">
      <div class="table-header">
        <h3>Daftar Mahasiswa</h3>
        <hr class="divider" />
      </div>
      <router-link :to="{ name: 'MahasiswaAdd' }" class="btn btn-primary mb-3"
        >Add<i class="bi bi-plus"></i>
      </router-link>
      <div class="table-responsive">
        <table class="table table-striped text-center border">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>Jurusan</th>
              <th>Jenis Kelamin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mahasiswa, index) in dataMhs" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ mahasiswa.name }}</td>
              <td>{{ mahasiswa.students_id }}</td>
              <td>{{ mahasiswa.major }}</td>
              <td>{{ mahasiswa.gender }}</td>
              <td>
                <div>
                  <router-link
                    :to="{ name: 'MahasiswaEdit', params: { id: mahasiswa.id } }"
                    class="btn btn-warning me-2"
                    ><i class="bi bi-pencil-fill"></i
                  ></router-link>
                  <button
                    type="button"
                    @click="handleDeleteMhs(mahasiswa.id)"
                    class="btn btn-danger"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
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
import { getAll, deleteMhs as apiDeleteMhs } from '../../services/mahasiswa-api'

export default {
  name: 'MahasiswaPage',

  setup() {
    const dataMhs = ref([])

    const fetchData = async () => {
      try {
        const data = await getAll()
        dataMhs.value = data
      } catch (error) {
        console.log('error', error)
      }
    }

    const handleDeleteMhs = async (id) => {
      try {
        await apiDeleteMhs(id)
        fetchData()
      } catch (error) {
        console.log('error', error)
      }
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      dataMhs,
      handleDeleteMhs
    }
  }
}
</script>
