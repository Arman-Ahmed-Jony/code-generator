import client from './client'

const RESOURCE_NAME = 'tenants'

export default {
  getAll () {
    return client().get(RESOURCE_NAME)
  },
  getById (id) {
    return client().get(`${RESOURCE_NAME}/${id}`)
  },
  create (payload) {
    return client().post(RESOURCE_NAME, payload)
  },
  update (id, payload) {
    return client().put(`${RESOURCE_NAME}/${id}`, payload)
  },
  deleteById (id) {
    return client().delete(`${RESOURCE_NAME}/${id}`)
  }
}
