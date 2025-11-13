
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { UserMsg } from './UserMsg'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {
    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <header className='app-header container'>
            <div className='header-container'>
                <h1>Bugs are Forever</h1>
                <nav className='app-nav'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/bug">Bugs</NavLink> 
                    <NavLink to="/user">Users</NavLink> 
                    <NavLink to="/about">About</NavLink>
                </nav>
            </div>
            <LoginSignup />
            <UserMsg />
        </header>
    )
}
