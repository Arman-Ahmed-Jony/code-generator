<script setup>
import { useTenantStore } from 'src/stores/tenant-store'
import { computed, onMounted, ref } from 'vue'
import TenantForm from '../components/TenantForm.vue'
import TenantList from '../components/TenantList.vue'
import { useCommonStore } from 'src/stores/common-store'
import { useBackButton } from 'src/composables/backButton'

useBackButton()

const commonStore = useCommonStore()
const createDialog = ref(false)
const editDialog = ref(false)

const tenantStore = useTenantStore()
const tenants = computed(() => tenantStore.tenants)

onMounted(() => {
  tenantStore.getAll()
})

const handleCreate = async (data) => {
  try {
    await tenantStore.create(data)
    createDialog.value = false
  } catch (error) {}
}

const handleView = (item) => {
  //here gose view related implementation
}

const selectedTenant = ref({})
const handleEdit = async (item) => {
  await tenantStore.update(item.id, item)
  editDialog.value = false
}
const handleDelete = (id) => {
  tenantStore.deleteById(id)
}
</script>
<template>
  <q-page padding>
    <content-loader :loading="commonStore.fetching">
      <TenantList
        v-model="tenants"
        @view="handleView"
        @edit="editDialog=true, selectedTenant = $event"
        @delete="handleDelete"
      />
    </content-loader>

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
        <TenantForm @submit="handleCreate">
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
        </TenantForm>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog">
      <q-card
        style="width: 700px;"
        class="q-pa-sm"
      >
        <TenantForm
          @submit="handleEdit"
          :model-value="selectedTenant"
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
        </TenantForm>
      </q-card>
    </q-dialog>
  </q-page>
</template>
