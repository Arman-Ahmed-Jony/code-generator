import Api from 'services/tenantService'

export default {
  async getAll (payload) {
    try {
      const { data: { data } } = await Api.getAll(payload)
      this.tenants = data
    } catch (error) {}
  },
  async getById (payload) {
    try {
      const { data: { data } } = await Api.getById(payload)
      this.tenant = data
    } catch (error) {}
  },
  async create (payload) {
    try {
      const { data: { data } } = await Api.create(payload)
      this.tenants.push(data)
    } catch (error) {}
  },
  async update (id, payload) {
    try {
      const { data: { data } } = await Api.update(id, payload)
      const index = this.tenants.findIndex((tenant) => tenant.id === id)
      this.tenants[index] = data
    } catch (error) {}
  },
  async deleteById (id) {
    try {
      await Api.deleteById(id)
      this.tenants = this.tenants.filter(tenant => tenant.id !== id)
    } catch (error) {}
  }
}
