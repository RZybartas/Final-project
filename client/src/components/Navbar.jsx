import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export const Navbar = () => {
    const auth = useAuth();
    
    const links = auth.token ? (
        <div>
            <Link to='/events' className="link">Events</Link>
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
            {/* <Link 
                className="link"
                to='/login'>
                    Login
            </Link>
            <Link 
                className="link"
                to='/register'>
                    Register
            </Link> */}
        </div>
    )


};