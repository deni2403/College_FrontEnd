<template>
  <div class="page-container d-flex justify-content-center align-items-center">
    <div class="box-container container-fluid">
      <div class="table-header">
        <h3>Daftar Mata Kuliah</h3>
        <hr class="divider" />
      </div>
      <router-link :to="{ name: 'MataKuliahAdd' }" class="add-btn btn btn-primary mb-3"
        >Add<i class="bi bi-plus"></i>
      </router-link>
      <div class="table-responsive">
        <table class="table table-striped text-center border">
          <thead>
            <tr class="align-middle">
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
                <div class="d-flex justify-content-center">
                  <router-link
                    :to="{ name: 'MataKuliahEdit', params: { id: mataKuliah.id } }"
                    class="btn btn-warning mx-1"
                    ><i class="bi bi-pencil-fill"></i
                  ></router-link>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmationModal"
                    @click="handleDeleteMatKul(mataKuliah.id)"
                    class="btn btn-danger mx-1"
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
    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteConfirmationModal"
      tabindex="-1"
      aria-labelledby="deleteConfirmationModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">Konfirmasi</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">Apakah kamu yakin ingin menghapus data ini?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="confirmDelete"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAllMatKul, deleteMatKul as apiDeleteMatKul } from '@/services/mataKuliah-api'
import { useToast } from 'vue-toastification'

export default {
  name: 'MataKuliahPage',
  setup() {
    const dataMatKul = ref([])
    const deletingItemId = ref(null)

    const toast = useToast()

    const fetchData = async () => {
      try {
        const data = await getAllMatKul()
        dataMatKul.value = data
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to load Data')
      }
    }

    const handleDeleteMatKul = async (id) => {
      deletingItemId.value = id
      document.getElementById('deleteConfirmationModal').classList.add('show')
    }

    const confirmDelete = async () => {
      try {
        const data = await apiDeleteMatKul(deletingItemId.value)
        await fetchData()
        toast.success(data)
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to delete Data')
      }
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      dataMatKul,
      handleDeleteMatKul,
      confirmDelete,
    }
  }
}
</script>
