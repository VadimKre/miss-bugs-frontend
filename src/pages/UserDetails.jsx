import { useState, useEffect } from 'react'

import { BugList } from '../cmps/BugList.jsx'
import { userService } from '../services/user.service.js'
import { bugService } from '../services/bug.service.js'
import { use } from 'react'

export function UserDetails(){

    const [bugsToDisplay, setBugsToDisplay] = useState()
    const [user, setUser] = useState()

    useEffect( () => {
        
        setUser(userService.getLoggedinUser())        
    }, [])

    useEffect( () => {
        console.log('user: ', user)
        if (user){
            const filterBy = { creator: user } 
            loadBugs(filterBy)
        }
    }, [user])

    const loadBugs = async (filterBy) => {
        const data = await bugService.query(filterBy)
        setBugsToDisplay(data.bugs)
    }

    console.log('bugs: ', bugsToDisplay)
    
    if (!bugsToDisplay) return <h3>Loading</h3>

    return(
        
        <BugList bugs={bugsToDisplay} />
    )
}