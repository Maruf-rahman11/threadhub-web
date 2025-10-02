import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;