import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider} from './components/AuthProvider';
import { Header } from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import AddEvent from './pages/AddEvent';
import { Events } from './pages/Events';
import { Login } from './pages/Login';
import { Register } from './pages/Register';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route 
                        path='/register' 
                        element={ <Register />} 
                    />
                    <Route 
                        path='/login' 
                        element={ <Login />} 
                    />
                    <Route 
                        path='/events' 
                        element={<RequireAuth><Events /></RequireAuth>} 
                    />
                    <Route 
                        path='/add' 
                        element={<RequireAuth><AddEvent /></RequireAuth>} 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
