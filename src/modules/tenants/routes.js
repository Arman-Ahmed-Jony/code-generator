export default [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'tenants',
        component: () => import('./pages/TenantIndex.vue'),
        name: 'tenants',
        meta: {
          help_key: 'tenants',
          requiresAuth: false,
          title: 'Tenants'
        }
      }
    ]
  }
]
