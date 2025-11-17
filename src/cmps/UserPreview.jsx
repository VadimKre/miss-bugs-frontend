
export function UserPreview({ user }){
    return(
        <article className="user-preview">
            <h4>{user.fullname}</h4>
            <h4>{user.username}</h4>
            {/* <h4>{user.password}</h4> */}
            <p>Score: <span>{user.score}</span></p>
        </article>
    )
}