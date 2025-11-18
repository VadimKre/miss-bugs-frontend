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

const BASE_URL =
    import.meta.env.VITE_BUGS_URL ||
    (import.meta.env.DEV
        ? 'http://localhost:3030/api/bug/'
        : 'https://miss-bugs-backend.onrender.com/api/bug/')


async function query(filterBy, sortBy, pageIdx, sortDir) {
    console.log('pageIdx in query: ', pageIdx)
    const params = {}
    filterBy && (params.filterBy = filterBy)
    sortBy && (params.sortBy = sortBy)
    pageIdx && (params.pageIdx = pageIdx)
    sortDir && (params.sortDir = sortDir)
    try{
        const { data } = await axios.get(BASE_URL, filterBy && {params})
        console.log('data: ', data)
        return {bugs: data.bugs, totalPages: data.totalPages}
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
        const bugs = await axios.delete(BASE_URL + `${bugId}`, { withCredentials: true })
        return bugs.data
    } catch(e){
        throw e
    }
    
}

async function save(bugToSave) {
    const method = bugToSave._id ? 'put' : 'post'

    try{
        const bug = await axios[method](BASE_URL, bugToSave, { withCredentials: true })
        return bug.data
    } catch(e){
        throw err
    }
    
}

async function downloadPDF(bugId){
    const pdf = await axios.get(BASE_URL + `${bugId}/pdf`)
    return pdf
}
