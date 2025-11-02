import axios from 'axios' 

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
}

const BASE_URL = 'http://localhost:3030/api/'


async function query() {
    const bugs = await axios.get(BASE_URL + 'bugs')
    return bugs.data
}

async function getById(bugId) {
    const bug = await axios.get(BASE_URL + `bug/${bugId}`)
    return bug.data
}

async function remove(bugId) {
    const bugs = await axios.get(BASE_URL + `bug/${bugId}/remove`)
    return bugs
}

async function save(bug) {
    console.log('bug to save: ', bug)
    const bugs = await axios.get(BASE_URL + 'bug/save', {params: bug})
    return bugs.data
}