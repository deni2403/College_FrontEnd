<template>
  <div class="page-container d-flex justify-content-center align-items-center">
    <div class="box-container container-fluid">
      <div class="table-header">
        <h3>Daftar Mata Kuliah</h3>
        <hr class="divider" />
      </div>
      <router-link :to="{ name: 'MataKuliahAdd' }" class="btn btn-primary mb-3"
        >Add<i class="bi bi-plus"></i>
      </router-link>
      <div class="table-responsive">
        <table class="table table-striped text-center border">
          <thead>
            <tr>
              <th>No.</th>
              <th>Mata Kuliah</th>
              <th>Kode</th>
              <th>SKS</th>
              <th>Dosen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mataKuliah, index) in dataMatKul" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ mataKuliah.name }}</td>
              <td>{{ mataKuliah.subjects_id }}</td>
              <td>{{ mataKuliah.credits }}</td>
              <td>
                <span v-if="mataKuliah.lecturers">{{ mataKuliah.lecturers.name }}</span>
                <span v-else>N/A</span>
              </td>
              <td>
                <div>
                  <router-link
                    :to="{ name: 'MataKuliahEdit', params: { id: mataKuliah.id } }"
                    class="btn btn-warning me-2"
                    ><i class="bi bi-pencil-fill"></i
                  ></router-link>
                  <button
                    type="button"
                    @click="handleDeleteMatKul(mataKuliah.id)"
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
import { getAllMatKul, deleteMatKul as apiDeleteMatKul } from '@/services/mataKuliah-api'

export default {
  name: 'MataKuliahPage',
  setup() {
    const dataMatKul = ref([])

    const fetchData = async () => {
      try {
        const data = await getAllMatKul()
        dataMatKul.value = data
      } catch (error) {
        console.log('error', error)
      }
    }

    const handleDeleteMatKul = async (id) => {
      try {
        await apiDeleteMatKul(id)
        fetchData()
      } catch (error) {
        console.log('error', error)
      }
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      dataMatKul,
      handleDeleteMatKul
    }
  }
}
</script>
