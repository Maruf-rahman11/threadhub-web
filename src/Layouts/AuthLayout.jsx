
import React from 'react';
import { Link, Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';


const AuthLayout = () => {
    return (
        <div >
            <div>
                <Navbar></Navbar>
                <div className='my-16'>
                    <Outlet></Outlet>
                </div>
                

            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;
