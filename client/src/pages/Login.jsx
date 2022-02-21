import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || password.length < 8) {
            setError('Incorrect data entered')
            return
        };
        const res = await login(email, password);
        if (res.err) {
            setError(res.err);
            console.log(res.err);
            return;
        }
        setError('null')
        navigate("/");
    }; 

    return (
        <div className='auth__main'>
            <h3 className='auth__title'>Login</h3> 

            <form className='auth__box-container' onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    onChange={onEmailChange}
                    required
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    onChange={onPasswordChange}
                    required
                />

                <button
                    type='submit'
                    className='auth__btn'
                >
                    Login
                </button>

                
                <Link 
                    to='/register'
                    className='auth__link'
                >
                    Create new account
                </Link>

                <div className='auth__alert-error'>{error}</div>
            </form>
        </div>
    )
};
