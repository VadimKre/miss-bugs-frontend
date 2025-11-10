import axios from 'axios' 

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


export const bugService = {
    query,
    getById,
    save,
    remove,
    downloadPDF,
}

const STORAGE_KEY = 'bugDB'

const BASE_URL = 'http://localhost:3030/api/bug/'


async function query(filterBy, sortBy) {
    console.log('filterBy in query: ', filterBy)
    const params = {}
    filterBy && (params.filterBy = filterBy)
    sortBy && (params.sortBy = sortBy)
    try{
        const { data } = await axios.get(BASE_URL, filterBy && {params})
        console.log('pages: ', data.totalPages)
        return data.bugs
    } catch(e){
        throw e
    }
}

async function getById(bugId) {
    try{
        const bug = await axios.get(BASE_URL + `${bugId}`, { withCredentials: true })
        return bug.data
    } catch(e){
        throw e
    }
}

async function remove(bugId) {
    try{
        const bugs = await axios.delete(BASE_URL + `${bugId}`)
        return bugs.data
    } catch(e){
        throw e
    }
    
}

async function save(bugToSave) {
    const method = bugToSave._id ? 'put' : 'post'

    try{
        const bug = await axios[method](BASE_URL, bugToSave)
        return bug.data
    } catch(e){
        throw err
    }
    
}

async function downloadPDF(bugId){
    const pdf = await axios.get(BASE_URL + `${bugId}/pdf`)
    return pdf
}