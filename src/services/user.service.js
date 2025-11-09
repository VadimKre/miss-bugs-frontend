import axios from 'axios' 

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


export const userService = {
    query,
    getById,
    save,
    remove
}

// const STORAGE_KEY = 'userDB'

const BASE_URL = 'http://localhost:3030/api/user/'


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
        const user = await axios.get(BASE_URL + `${bugId}`, { withCredentials: true })
        return user.data
    } catch(e){
        throw e
    }
}

async function remove(userId) {
    try{
        const users = await axios.delete(BASE_URL + `${userId}`)
        return users.data
    } catch(e){
        throw e
    }
    
}

async function save(userToSave) {
    const method = userToSave._id ? 'put' : 'post'

    try{
        const user = await axios[method](BASE_URL, userToSave)
        return user.data
    } catch(e){
        throw err
    }
    
}
