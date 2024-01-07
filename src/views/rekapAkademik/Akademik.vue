<template>
  <div class="page-container d-flex justify-content-center align-items-center">
    <div class="box-container container-fluid">
      <div class="table-header">
        <h3>Daftar Rekap Akademik</h3>
        <hr class="divider" />
      </div>
      <div class="table-responsive">
        <table class="table table-striped text-center table-bordered">
          <thead>
            <tr class="align-middle">
              <th>No.</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>Jurusan</th>
              <th>Mata Kuliah Terdaftar</th>
              <th>Dosen Mata Kuliah</th>
              <th>NIP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="align-middle" v-for="(data, index) in dataAkademik" :key="data.id">
              <td>{{ index + 1 }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.students_id }}</td>
              <td>{{ data.major }}</td>
              <td>
                <p v-html="enrolledSubjects(data)"></p>
              </td>
              <td>
                <p v-html="lecturersNames(data)"></p>
              </td>
              <td>
                <p v-html="lecturersIds(data)"></p>
              </td>
              <td>
                <div class="d-flex justify-content-center gap-2 flex-column align-items-center">
                  <router-link
                    :to="{ name: 'RekapAkademikAdd', params: { id: data.id } }"
                    class="btn btn-primary"
                    ><i class="bi bi-plus-lg"></i>
                  </router-link>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmationModal"
                    @click="HandleDeleteData(data.id)"
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
          <div class="modal-body">Apakah kamu yakin ingin menghapus semua mata kuliah terdaftar pada data ini?</div>
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
import { getAllAssigned, deleteAssigned } from '../../services/assigned-matkul-api.js'
import { useToast } from 'vue-toastification'

export default {
  name: 'AkademikPage',
  setup() {
    const dataAkademik = ref([])
    const toast = useToast()
    const deletingItemId = ref(null)

    const fetchData = async () => {
      try {
        const data = await getAllAssigned()
        dataAkademik.value = data
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to load data')
      }
    }

    const HandleDeleteData = async (id) => {
      deletingItemId.value = id
      document.getElementById('deleteConfirmationModal').classList.add('show')
    }

    const confirmDelete = async () => {
      try {
        const data = await deleteAssigned(deletingItemId.value)
        await fetchData()
        toast.success(data)
      } catch (error) {
        console.error('error', error)
        toast.error('Failed to delete data')
      }
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      dataAkademik,
      HandleDeleteData,
      confirmDelete,


      enrolledSubjects(data) {
        return data.enrolled_subjects.map((subject) => subject.name).join(',<br>')
      },
      lecturersNames(data) {
        return data.enrolled_subjects
          .map((subject) => (subject.lecturers && subject.lecturers.name) || 'N/A')
          .join(',<br>')
      },
      lecturersIds(data) {
        return data.enrolled_subjects
          .map((subject) => (subject.lecturers && subject.lecturers.lecturers_id) || 'N/A')
          .join(',<br>')
      }
    }
  }
}
</script>
