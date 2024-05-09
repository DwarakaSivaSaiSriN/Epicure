import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetState } from '../redux/slices/clientLoginSlice'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


function Header() {

    const { isPending, currentClient, errStatus, errMsg, loginStatus } = useSelector((state) => state.clientLogin)
    let dispatch = useDispatch()

    function signoutFunc() {
        sessionStorage.removeItem('token')
        dispatch(resetState())
    }


    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-white" to=''>
                        <h3>EPICURE</h3>
                    </NavLink>
                    <div>
                        <button type='button'
                            className='navbar-toggler btn-dark'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarSupportedContent'>
                            <span className='navbar-toggler-icon bg-white' ></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className='navbar-nav bg-dark'>
                                {
                                    loginStatus === false ? (
                                        <>
                                            <li className='nav-item'>
                                                <NavLink className='nav-link text-white' to=''>Home</NavLink>
                                            </li>
                                            <li className='nav-item'>
                                                <NavLink className='nav-link text-white' to='login' >Login</NavLink>
                                            </li>
                                            <li className='nav-item'>
                                                <NavLink className='nav-link text-white' to='signin'>Signin</NavLink>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                currentClient.clientType === 'client' && (<>
                                                    <li className='nav-item'>
                                                        <NavLink className='nav-link text-white' to=''><i class="fa-solid fa-cart-shopping"></i>Cart</NavLink>
                                                    </li>
                                                </>)
                                            }
                                            <li className='nav-item'>
                                                <NavLink className='nav-link text-white' to='' ><i class="fa-solid fa-stopwatch"></i> Orders</NavLink>
                                            </li>
                                            <li className='nav-item'>
                                                <NavLink className='nav-link text-white' to='' onClick={signoutFunc}><i className="fa fa-sign-out pull-right"></i> Signout</NavLink>
                                            </li>
                                        </>
                                    )
                                }

                            </ul>s
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Header