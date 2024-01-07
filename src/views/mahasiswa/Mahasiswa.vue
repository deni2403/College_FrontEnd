<template>
  <div class="page-container d-flex justify-content-center align-items-center">
    <div class="box-container container-fluid">
      <div class="table-header">
        <h3>Daftar Mahasiswa</h3>
        <hr class="divider" />
      </div>
      <router-link :to="{ name: 'MahasiswaAdd' }" class="add-btn btn btn-primary mb-3"
        >Add<i class="bi bi-plus"></i>
      </router-link>
      <div class="table-responsive">
        <table class="table table-striped text-center border">
          <thead>
            <tr class="align-middle">
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
                <div class="d-flex justify-content-center">
                  <router-link
                    :to="{ name: 'MahasiswaEdit', params: { id: mahasiswa.id } }"
                    class="btn btn-warning mx-1"
                    ><i class="bi bi-pencil-fill"></i
                  ></router-link>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmationModal"
                    @click="handleDeleteMhs(mahasiswa.id)"
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
import { getAll, deleteMhs as apiDeleteMhs } from '../../services/mahasiswa-api'
import { useToast } from 'vue-toastification'

export default {
  name: 'MahasiswaPage',

  setup() {
    const dataMhs = ref([])
    const toast = useToast()
    const deletingItemId = ref(null)

    const fetchData = async () => {
      try {
        const data = await getAll()
        dataMhs.value = data
      } catch (error) {
        console.error('error', error)
        toast.error('Failed load data')
      }
    }

    const handleDeleteMhs = async (id) => {
      deletingItemId.value = id
      document.getElementById('deleteConfirmationModal').classList.add('show')
    }

    const confirmDelete = async () => {
      try {
        const data = await apiDeleteMhs(deletingItemId.value)
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
      dataMhs,
      handleDeleteMhs,
      confirmDelete
    }
  }
}
</script>
