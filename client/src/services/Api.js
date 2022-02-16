const API = `${process.env.REACT_APP_BASE_URL}`;

export class Api {
    static async register(email, password) {
        const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });
        return res.json();
    };

    static async login(email, password) {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });
        return res.json();
    }
}