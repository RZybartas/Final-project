import logo from '../assets/logo.png'
import { Navbar } from './Navbar'

export const Header = () => {
    return (
        <div className='header'>
            <img 
                className='header__logo'
                src={logo}
                alt='logo'
            />
            <Navbar />
        </div>
    )
}