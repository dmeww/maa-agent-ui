import PocketBase from 'pocketbase'

import {toast} from "@/toast";
import router from "@/router";
import {Auth} from "@/pocketbase/types.ts";


const pocketbase = new PocketBase()

export const usePocketBase = () => {
    if (!pocketbase.authStore.isValid) {
        toast.error('PocketBase 登录失效，请重新登录')
        router.push('/login')
        return null
    }
    pocketbase.autoCancellation(false)
    pocketbase.baseUrl = localStorage.getItem('pb_url') as string
    return pocketbase
}

export async function login(auth: Auth) {
    pocketbase.baseUrl = auth.baseUrl
    let success = await pocketbase.admins.authWithPassword(auth.email, auth.password)
        .then(() => true)
        .catch(err => {
            console.log('PocketBase auth error', err)
            return false
        })
    if (success) {
        localStorage.setItem('pb_url', auth.baseUrl)
        toast.success('登录成功')
        await router.push('/')
    } else {
        toast.error('登录失败')
    }
}

export async function logout() {
    pocketbase.authStore.clear()
    localStorage.removeItem('pb_url')
    toast.success('退出登录')
    // router.push('/login').catch(err => console.log(err))
    location.replace('/login')
}