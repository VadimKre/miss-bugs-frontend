import { useState } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function LoginSignup(){

    const location = useLocation()

    const [isLoggedIn, setIsLoggedIn] = useState(userService.getLoggedinUser())
    const [funcLogin, setFuncLogin] = useState(true)
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const handleLogin = async () => {
        const user = await userService.login(credentials)
        user && setIsLoggedIn(user)
    }

    const handleSignup = async () => {
        const creds = { username: credentials.username, password: credentials.password }

        const res = await userService.signup(credentials)
        if (res.status === 200) {
            showSuccessMsg('Signed up succsessfully')
            setTimeout(async () => {
                const user = await userService.login(creds)
                user && setIsLoggedIn(user)
            }, 600)
        }
    }

    const handleLogout = async () => {
        await userService.logout()
        setIsLoggedIn(null)
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    const handleChangeFunc = () => {
        setFuncLogin((is) => !is)
    }


    return(
        <div className="login-signup-container">
            {
                (!isLoggedIn && location.pathname === '/') &&
                    (funcLogin ? 
                        <div className="login-signup-modal">
                            <button onClick={handleChangeFunc}>Sign Up</button>
                            UserName: <input type="text" name='username' value={credentials.username} onChange={handleChange}/>
                            Password: <input type="text" name='password' value={credentials.password} onChange={handleChange}/>
                            <button onClick={handleLogin}>Log In </button>
                        </div>
                    :
                        <div className="login-signup-modal">
                            <button onClick={handleChangeFunc}>Log In</button>
                            UserName: <input type="text" name='username' value={credentials.username} onChange={handleChange}/>
                            Password: <input type="text" name='password' value={credentials.password} onChange={handleChange}/>
                            Full Name: <input type="text" name='fullname' value={credentials.fullname} onChange={handleChange}/>
                            <button onClick={handleSignup}>Sign Up </button>
                        </div>)
            }
            {
                isLoggedIn && 
                    <div>
                        <h3>Hello user</h3>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
            }
        </div>
    )
}