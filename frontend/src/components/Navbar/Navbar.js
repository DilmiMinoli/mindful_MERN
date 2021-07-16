import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.js';
import './navbar.css';
import {isAuthenticated} from '../helpers/auth';



function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    },[])

    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        SHOPDROP <i className="fab fa-typo3"></i>
                    </Link>

                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>

                    
                        <ul className={click ? 'nav-menu active':'nav-menu'}>
                            
                          
                            <li className ='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className ='nav-item'>
                                <Link to='/login' className='nav-links-mobile'  onClick={closeMobileMenu}>
                                   Login
                                </Link>
                            </li>
                            <li className ='nav-item'>
                                <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Register
                                </Link>
                            </li>
                        </ul>
                        {button &&<Button buttonStyle='btn--outline'><Link to='/login' className='btn-mobile'>Login</Link></Button>}
                        {button &&<Button buttonStyle='btn--outline'><Link to='/Register' className='btn-mobile'>Register</Link></Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar