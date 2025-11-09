import { useState } from 'react'
import { useEffect } from 'react'

import { userService } from '../services/user.service.js' 
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserList } from '../cmps/UserList.jsx'
import { use } from 'react'
// import { BugFilter } from '../cmps/BugFilter.jsx'

export function UserIndex() {
    const [users, setUsers] = useState([])
    const [filterBy, setFilterBy] = useState({})
    // const [sortBy, setSortBy] = useState({})

    useEffect(() => {
        loadUsers(filterBy)
    }, [filterBy])

    async function loadUsers(filterBy) {
        const users = await userService.query(filterBy)
        setUsers(users)
    }

    async function onRemoveUser(userId) {
        try {
            await userService.remove(userId)
            console.log('Deleted Succesfully!')
            // setBugs(prevUsers => prevUsers.filter((user) => user._id !== userId))
            loadUsers()
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddUser() {
        const user = {
            fullname: prompt('Full Name?'),
            username: prompt('User Name?'),
            password: prompt('Password?'),
            score: +prompt('Score?')
        }
        try {
            const savedUser = await userService.save(user)
            console.log('Added User', savedUser)
            // setBugs(prevBugs => [...prevBugs, savedBug])
            loadUsers()
            showSuccessMsg('User added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add user')
        }
    }

    async function onEditUser(user) {
        const score = +prompt('New score?')
        const userToSave = { ...user, score }
        try {

            const savedUser = await userService.save(userToSave)
            console.log('Updated User:', savedUser)
            loadUsers()
            // setBugs(prevUsers => prevUsers.map((currUser) =>
            //     currUser._id === savedUser._id ? savedUser : currUser
            // ))
            showSuccessMsg('User updated')
        } catch (err) {
            console.log('Error from onEditUser ->', err)
            showErrorMsg('Cannot update user')
        }
    }

    function onSetFilterBy(filterByToSet){
        setFilterBy(filterByToSet)
    }

    return (
        <section >
            <h3>Users</h3>
            <main>
                <button onClick={onAddUser}>Add User</button>
                <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
            </main>
        </section>
    )
}
