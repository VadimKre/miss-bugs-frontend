import axios from 'axios'

export const msgService = {
    query,
    getById,
    save,
    remove,
}

const BASE_URL =
    import.meta.env.VITE_MSG_URL ||
    (import.meta.env.DEV
        ? 'http://localhost:3030/api/msg/'
        : 'https://miss-bugs-backend.onrender.com/api/msg/')

async function query(filterBy = {}) {
    const filterParams = {}
    if (filterBy.aboutBugId) filterParams.aboutBugId = filterBy.aboutBugId
    if (filterBy.byUserId) filterParams.byUserId = filterBy.byUserId

    const config = Object.keys(filterParams).length ? { params: { filterBy: filterParams } } : undefined

    try {
        const { data } = await axios.get(BASE_URL, config)
        return data
    } catch (e) {
        throw e
    }
}

async function getById(msgId) {
    try {
        const msg = await axios.get(BASE_URL + `${msgId}`, { withCredentials: true })
        return msg.data
    } catch (e) {
        throw e
    }
}

async function remove(msgId) {
    try {
        const removedMsg = await axios.delete(BASE_URL + `${msgId}`, { withCredentials: true })
        return removedMsg.data
    } catch (e) {
        throw e
    }
}

async function save(msgToSave) {
    const method = msgToSave._id ? 'put' : 'post'

    try {
        const msg = await axios[method](BASE_URL, msgToSave, { withCredentials: true })
        return msg.data
    } catch (e) {
        throw e
    }
}
