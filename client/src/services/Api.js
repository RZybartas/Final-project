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
    };

    static async getEvents(token) {
        const res = await fetch(`${API}/events`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        return res.json();
    };

    static async addEvent(events, token) {
        const res = await fetch(`${API}/events/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(events)
        });
        return res.json();
    };

    static async addReserve(reserve, token) {
        const res = await fetch(`${API}/registration/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reserve)
        });
        
        return res.json();
    };

    static async update(reserve, id, token) {
        const res = await fetch(`${API}/registration/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reserve)
        });
        
        
        return res.json();
    };

    static async delete(id, token) {
        if (!id) throw new Error("No argument");

        const res = await fetch(`${API}/registration/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        

        return res.json();
    }

    static async getAllByEventId(token, id) {
        const res = await fetch(`${API}/registration/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        return res.json();
    }
}