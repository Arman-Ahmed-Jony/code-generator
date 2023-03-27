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
    v-for="(user, index) in modelValue"
    :key="index"
  >
  <q-item-section @click="$emit('view', user)">
    
        {{ user.name }}
      
        {{ user.email }}
      
        {{ user.amount }}
      
        {{ user.description }}
      
    
  </q-item-section>
  <q-item-section side>
    <OverflowMenu
      :menus="[
        {
          label: 'Edit',
          handler: () => { $emit('edit', user)}
        },
        {
          label: 'Delete',
          handler: () => { $emit('delete', user.id)},
          warning: {
          show: true,
          entityName: 'user',
          entityType: 'a user named'
          }
        }
      ]"
    />
   </q-item-section>
  </q-item>
</q-list>
</template>