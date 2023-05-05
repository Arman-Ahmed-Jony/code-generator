<script setup>
import { useStore } from 'src/stores/user-store'
import { computed, onMounted, ref } from 'vue'
import UserForm from '../components/userForm.vue'
import UserList from '../components/userList.vue'

const createDialog = ref(false)
const editDialog = ref(false)

const userStore = useUserStore()
const users = computed(() => userStore.users)
onMounted(() => {
    userStore.getAll()
})

const handleCreate = async (data) => {
  try {
    await store.create(data)
    createDialog.value = false
  } catch (error) {}
}

const handleView = (item) => {
  //here gose view related implementation
}

const selectedItem = ref({})
const handleEdit = async (item) => {
  await store.update(item.id, item)
  editDialog.value = false
}
const handleDelete = (id) => {
  store.deleteById(id)
}
</script>
<template>
  <q-page padding>
    <ListComponent
      v-model="stateName"
      @view="handleView"
      @edit="editDialog=true, selectedItem=$event"
      @delete="handleDelete"
    />
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        rounded
        glossy
        icon="o_add"
        color="primary"
        padding="sm"
        size="lg"
        @click="createDialog = true"
      />
    </q-page-sticky>
    <q-dialog v-model="createDialog">
      <q-card
        style="width: 700px;"
        class="q-pa-sm"
      >
        <FormComponent @submit="handleCreate">
          <template #action>
            <div class="row justify-end">
              <q-btn
               color="primary"
                label="Create"
                type="submit"
                no-caps
              />
            </div>
          </template>
        </FormComponent>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog">
      <q-card
        style="width: 700px;"
        class="q-pa-sm"
      >
        <FormComponent
          @submit="handleEdit"
          :data="selectedItem"
        >
          <template #action>
            <div class="row justify-end">
              <q-btn
                color="primary"
                label="Edit"
                type="submit"
                no-caps
              />
            </div>
          </template>
        </FormComponent>
      </q-card>
    </q-dialog>
  </q-page>
</template>