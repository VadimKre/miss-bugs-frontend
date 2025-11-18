import Axios from 'axios' 

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const axios = Axios.create({withCredentials: true})


export const userService = {
    query,
    getById,
    save,
    remove,
    login,
    signup,
    logout,
    getLoggedinUser
    
}

// const STORAGE_KEY = 'userDB'

const AUTH_URL =
    import.meta.env.VITE_AUTH_URL ||
    (import.meta.env.DEV
        ? 'http://localhost:3030/api/auth/'
        : 'https://miss-bugs-backend.onrender.com/api/auth/')
const BASE_URL =
    import.meta.env.VITE_USERS_URL ||
    (import.meta.env.DEV
        ? 'http://localhost:3030/api/user/'
        : 'https://miss-bugs-backend.onrender.com/api/user/')

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function query(filterBy, sortBy) {
    console.log('filterBy in query: ', filterBy)
    try{
        const users = await axios.get(BASE_URL, filterBy && {params: {filterBy}})
        return users.data
    } catch(e){
        throw e
    }
}

async function getById(userId) {
    try{
        const user = await axios.get(BASE_URL + `${userId}`, { withCredentials: true })
        return user.data
    } catch(e){
        throw e
    }
}

async function remove(userId) {
    try{
        const users = await axios.delete(BASE_URL + `${userId}`, { withCredentials: true })
        return users.data
    } catch(e){
        throw e
    }
}

async function save(userToSave) {
    const method = userToSave._id ? 'put' : 'post'

    try{
        const user = await axios[method](BASE_URL, userToSave, { withCredentials: true })
        return user.data
    } catch(e){
        throw err
    }
}

async function login(credentials){
    try{
        const {data: user} = await axios.post(AUTH_URL + 'login', credentials)
        if (user) return saveLocalUser(user)
    } catch(e){
        throw e
    }

}
async function signup(user){
    try{
        const res = await axios.post(AUTH_URL + 'signup', user)
        return res
    } catch(e){
        throw e
    }
}

async function logout(){
    try{
        await axios.post(AUTH_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    }catch(e){
        throw e
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}


