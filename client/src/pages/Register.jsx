import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Api } from '../services/Api';

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            setError('Incorrect data')
            return
        };

        const res = await Api.register(email, password);
        console.log(res);
        if (res.err) {
            setError(res.err);
            return;
        }
        setError(null);
        navigate("/login");
    };

    return (
        <div className='auth__main'>
            <h3 className='auth__title'>Register</h3> 

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
                    Register
                </button>

                
                <Link 
                    to='/register'
                    className='auth__link'
                >
                    Already registered ?
                </Link>
                <div className='auth__alert-error'>{error}</div>
            </form>
        </div>
    )
}
