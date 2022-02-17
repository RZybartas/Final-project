import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export const Navbar = () => {
    const auth = useAuth();
    
    const links = auth.token ? (
        <div>
            <Link to='/' className="link">Home</Link>
            <Link to='/add' className="link">Add Event</Link>
            <span className="link" onClick={() => auth.logout()}>Logout</span>
        </div>
    ) : (
        <div>
            <Link to='/login' className="link">Login</Link>
            <Link to='/register' className="link">Register</Link>
        </div>
    );
    return (
        <div>
            {links}
        </div>
    )


};