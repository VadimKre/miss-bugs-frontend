import axios from 'axios' 

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
    downloadPDF,
}

const BASE_URL = 'http://localhost:3030/api/'


async function query(filterBy, sortBy) {
    const url = BASE_URL + 'bug'
    try{
        const bugs = await axios.get(url, filterBy && {params: filterBy})
        return bugs.data
    } catch(e){
        throw e
    }
}

async function getById(bugId) {
    const url = BASE_URL + 'bug'
    try{
        const bug = await axios.get(url + `/${bugId}`, { withCredentials: true })
        return bug.data
    } catch(e){
        throw e
    }
}

async function remove(bugId) {
    const url = BASE_URL + 'bug'
    try{
        const bugs = await axios.delete(url + `/${bugId}`)
        return bugs
    } catch(e){
        throw e
    }
    
}

async function save(bugToSave) {
    const url = BASE_URL + 'bug'
    // const bugs = await axios.get(BASE_URL + 'bug/save', {params: bug})
    const method = bugToSave._id ? 'put' : 'post'

    try{
        const bug = await axios[method](url, bugToSave)
        return bug.data
    } catch(e){
        throw err
    }
    
}

async function downloadPDF(bugId){
    const pdf = await axios.get(BASE_URL + `bug/${bugId}/pdf`)
    return pdf
}