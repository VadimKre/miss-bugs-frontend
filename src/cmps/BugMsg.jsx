import { useEffect, useMemo, useState } from 'react'
import { msgService } from '../services/msg.service.js'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BugMsg({ bugId }) {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const loggedinUser = useMemo(() => userService.getLoggedinUser(), [])

    useEffect(() => {
        if (!bugId) return
        loadMessages()
    }, [bugId])


    async function loadMessages() {
        if (!bugId) return
        setIsLoading(true)
        try {
            const msgs = await msgService.query({ aboutBugId: bugId })
            setMsgs(msgs)
        } catch (err) {
            showErrorMsg('Could not load messages')
        } finally {
            setIsLoading(false)
        }
    }

    async function onSendMsg(ev) {
        ev.preventDefault()
        const trimmedTxt = txt.trim()
        if (!trimmedTxt) return
        if (!loggedinUser) return showErrorMsg('Please login to send a message')

        try {
            const savedMsg = await msgService.save({ txt: trimmedTxt, aboutBugId: bugId })
            setMsgs(prevMsgs => [...prevMsgs, savedMsg])
            setTxt('')
            showSuccessMsg('Message sent')
        } catch (err) {
            showErrorMsg('Could not send message')
        }
    }

    return (
        <section className="bug-msg">
            <header className="bug-msg-header">
                <h4>Bug chat</h4>
                <button type="button" onClick={loadMessages}>Refresh</button>
            </header>

            <div className="chat-window">
                {isLoading && <p className="muted">Loading messages...</p>}
                {!isLoading && !msgs.length && <p className="muted">No messages yet. Start the conversation.</p>}
                {!isLoading && msgs.map(msg => {
                    const msgUserId = msg.byUserId
                    const isMine = loggedinUser && msgUserId === loggedinUser._id
                    const label = isMine ? 'You' : (msgUserId ? `User ${msgUserId.slice(-4)}` : 'Guest')
                    return (
                        <article key={msg._id || msgUserId + msg.txt} className={`chat-line ${isMine ? 'mine' : 'theirs'}`}>
                            <span className="author">{label}</span>
                            <p>{msg.txt}</p>
                        </article>
                    )
                })}
            </div>

            <form className="msg-form" onSubmit={onSendMsg}>
                <input
                    type="text"
                    value={txt}
                    placeholder={loggedinUser ? 'Add a message' : 'Login to join the chat'}
                    onChange={(ev) => setTxt(ev.target.value)}
                    disabled={!loggedinUser}
                />
                <button type="submit" disabled={!loggedinUser}>Send</button>
            </form>
        </section>
    )
}
