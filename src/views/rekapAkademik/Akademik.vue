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
            <tr>
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
                  <button type="button" @click="HandleDeleteData(data.id)" class="btn btn-danger">
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
import { getAllAssigned, deleteAssigned } from '../../services/assigned-matkul-api.js'

export default {
  name: 'AkademikPage',
  setup() {
    const dataAkademik = ref([])

    const fetchData = async () => {
      try {
        const data = await getAllAssigned()
        dataAkademik.value = data
      } catch (error) {
        console.log(error)
      }
    }

    const HandleDeleteData = async (id) => {
      try {
        await deleteAssigned(id)
        fetchData()
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      dataAkademik,
      HandleDeleteData,
      enrolledSubjects(data) {
        return data.enrolled_subjects.map((subject) => subject.name).join(',<br>')
      },
      lecturersNames(data) {
        return data.enrolled_subjects
          .map((subject) => (subject.lecturers && subject.lecturers.name) || '')
          .join(',<br>')
      },
      lecturersIds(data) {
        return data.enrolled_subjects
          .map((subject) => (subject.lecturers && subject.lecturers.lecturers_id) || '')
          .join(',<br>')
      }
    }
  }
}
</script>
