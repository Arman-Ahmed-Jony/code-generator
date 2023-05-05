import Api from 'services/userService'

export default {
  async getAll (payload) {
    try {
      const { data: { data } } = await Api.getAll(payload)
      this.users = data
    } catch (error) {}
  },
  async getById (payload) {
    try {
      const { data: { data } } = await Api.getById(payload)
      this.user = data
    } catch (error) {}
  },
  async create (payload) {
    try {
      const { data } = await Api.create(payload)
      this.users.push(data)
    } catch (error) {}
  },
  async update (id, payload) {
    try {
      const { data } = await Api.update(id, payload)
      const index = this.users.findIndex((user) => user.id === id)
      this.users[index] = data
    } catch (error) {}
  },
  async deleteById (id) {
    try {
      await Api.deleteById(id)
      this.users = this.users.filter(user => user.id !== id)
    } catch (error) {}
  }
}