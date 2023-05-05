<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
modelValue: {
   type: Object,
   required: false,
   default: () => {
   return {
    
      name: '',
    
      email: '',
    
      amount: '',
    
      description: '',
    
   }
   }
}
})

const emit = defineEmits([
   'submit'
])

const form = ref({})

watchEffect(() => {
JSON.parse(JSON.stringify(props.modelValue))
})

const handleSubmit = () => {
emit('submit', form.value)
}

</script>

<template>
<q-form @submit="handleSubmit">
   <q-card-section class="q-pa-none">
    
      <q-input
        label="name"
        v-model="form.name"
        placeholder="Type name"
        type="text"
        :rules="[(val) => !!val || 'Field is required']"
      />
    
      <q-input
        label="email"
        v-model="form.email"
        placeholder="Type email"
        type="text"
        :rules="[(val) => !!val || 'Field is required']"
      />
    
      <q-input
        label="amount"
        v-model="form.amount"
        placeholder="Type amount"
        type="text"
        :rules="[(val) => !!val || 'Field is required']"
      />
    
      <q-input
        label="description"
        v-model="form.description"
        placeholder="Type description"
        type="text"
        :rules="[(val) => !!val || 'Field is required']"
      />
    
   </q-card-section>
   <q-card-actions
     class="q-pa-none"
     align="right"
   >
     <slot name="action"/>
   </q-card-actions>
</q-form>
</template>