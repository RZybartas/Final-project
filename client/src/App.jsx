import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider} from './components/AuthProvider';
import { Header } from './components/Header';
import { ModalUpdate } from './components/ModalUpdate';
import { RequireAuth } from './components/RequireAuth';
import { AddEvent } from './pages/AddEvent';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Reservation } from './pages/Reservation';


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
                        path='/' 
                        element={<RequireAuth><Home /></RequireAuth>} 
                    />
                    <Route 
                        path='/add' 
                        element={<RequireAuth><AddEvent /></RequireAuth>} 
                    />
                    <Route 
                        path='/reservation/:id' 
                        element={<RequireAuth><Reservation /></RequireAuth>} 
                    />
                    <Route 
                        path='/update/:id' 
                        element={<RequireAuth><ModalUpdate /></RequireAuth>} 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
