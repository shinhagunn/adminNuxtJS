import { Context } from '@nuxt/types'

export default (context: Context) => {
  context.app.router?.beforeEach((to, _, next) => {
      if(to.path === '/dashboard') {
          return next('/dashboard/users');
      } else {
          return next();
      }
  })
}