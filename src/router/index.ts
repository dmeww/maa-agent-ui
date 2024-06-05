import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import EmptyLayout from "@/layout/EmptyLayout.vue";
import {useGuard} from "@/router/guard";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'autoclick',
                meta: {
                    title: '任务配置'
                },
                component: () => import('@/views/maa/autoclick/AutoTaskPanel.vue')
            },
            {
                path: 'queue',
                name: 'queue',
                meta: {
                    title: '任务队列'
                },
                component: () => import('@/views/agent/queue/QueueVIew.vue')
            },
            {
                path: 'profiles',
                name: 'profiles',
                meta: {
                    title: '我的预设'
                },
                component: () => import('@/views/agent/profiles/ProfilesView.vue')
            },
            {
                path: 'tasks',
                name: 'tasks',
                meta: {
                    title: '任务仓库'
                },
                component: () => import('@/views/agent/tasks/TasksView.vue')
            },
            {
                path: 'cron',
                name: 'cron',
                meta: {
                    title: '定时任务'
                },
                component: () => import('@/views/agent/cron/CronView.vue')
            },
            {
                path: 'logs',
                name: 'logs',
                meta: {
                    title: '任务日志'
                },
                component: () => import('@/views/agent/logs/LogsView.vue')
            },
            {
                path: 'heartbeat',
                name: 'heartbeat',
                meta: {
                    title: '活跃状态'
                },
                component: () => import('@/views/agent/heartbeat/HeartBeatView.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'auth',
        component: EmptyLayout,
        children: [
            {
                path: '',
                name: 'login',
                meta: {
                    title: '登录'
                },
                component: () => import('@/views/auth/AuthView.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue')
    }

]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


useGuard(router)

export default router




