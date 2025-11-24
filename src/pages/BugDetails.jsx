import { useEffect, useState } from 'react'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BugMsg } from '../cmps/BugMsg.jsx'

const PDF_BASE_URL =
    import.meta.env.VITE_BUG_PDF_URL ||
    (import.meta.env.DEV
        ? 'http://localhost:3030'
        : 'https://miss-bugs-backend.onrender.com')


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        loadBug()
    }, [bugId])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch (err) {
            showErrorMsg('Cannot load bug')
        }
    }

    if (!bug) return <h1>loadings....</h1>
    return <div className="bug-details main-layout">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>{`Description: ${bug.description}`}</p>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Labels: {bug.labels.join(', ')}</p>
        <Link to={`${PDF_BASE_URL}/api/bug/${bugId}/pdf`}><button>Download</button></Link>
        <Link to="/bug">Back to List</Link>
        <BugMsg bugId={bugId} />
    </div>

}

