import { defineStore } from 'pinia'
import actions from './actions'

export const useTenantStore = defineStore('tenants', {
  state: () => ({
    tenants: [],
    tenant: {}
  }),
  actions
})
