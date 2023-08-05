import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
        <div>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}