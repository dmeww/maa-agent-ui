import {Router} from "vue-router";


export const useGuard = (router: Router) => {

    router.beforeEach((to, from, next) => {
        from.hash
        const routes = new Set(router.getRoutes().map(ro => ro.path))
        if (routes.has(to.path)) {
            next()
        } else {
            next({path: '/404'})
        }
    })

}
