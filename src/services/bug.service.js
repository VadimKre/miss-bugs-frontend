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


async function query(filterBy) {
    const bugs = await axios.get(BASE_URL + 'bugs', filterBy && {params: filterBy})
    return bugs.data
}

async function getById(bugId) {
    const bug = await axios.get(BASE_URL + `bug/${bugId}`, { withCredentials: true })
    return bug.data
}

async function remove(bugId) {
    const bugs = await axios.get(BASE_URL + `bug/${bugId}/remove`)
    return bugs
}

async function save(bug) {
    const bugs = await axios.get(BASE_URL + 'bug/save', {params: bug})
    return bugs.data
}

async function downloadPDF(bugId){
    const pdf = await axios.get(BASE_URL + `bug/${bugId}/pdf`)
    return pdf
}