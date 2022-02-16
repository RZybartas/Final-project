import { useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { Api } from "../services/Api";


export const AuthProvider = ({children}) => {
    const token = sessionStorage.getItem('token');

    const [state, setState] = useState({
        token,
        error: null,
    });

    const login = async (email, password) => {
        const res = await Api.login(email, password);

        if (res.error) {
            console.error(res.error);

            setState({error: res.error, token: null});

            return {error: res.error}
        }

        setState(({error: null, token: res.token}));
        sessionStorage.setItem('token', res.token);

        return {token: res.token};
    };

    const logout = () => {
        setState({
            token: null,
            error: null,
        });

        sessionStorage.removeItem('token');
    };

    const value = {...state, login, logout};
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}