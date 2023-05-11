<script setup>

defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})
defineEmits([
'edit', 'delete', 'view'
])

</script>

<template>
<q-list>
  <q-item
    clickable
    v-for="(tenant, index) in modelValue"
    :key="index"
  >
  <q-item-section @click="$emit('view', tenant)">
    
        {{ tenant.name }}
      
        {{ tenant.age }}
      
    
  </q-item-section>
  <q-item-section side>
    <OverflowMenu
      :menus="[
        {
          label: 'Edit',
          handler: () => { $emit('edit', tenant)}
        },
        {
          label: 'Delete',
          handler: () => { $emit('delete', tenant.id)},
          warning: {
          show: true,
          entityName: 'tenant',
          entityType: 'a tenant named'
          }
        }
      ]"
    />
   </q-item-section>
  </q-item>
</q-list>
</template>