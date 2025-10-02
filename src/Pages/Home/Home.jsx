import React, { use } from 'react';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { FaBell } from 'react-icons/fa';
import HomePosts from './HomePosts';
import AnnouncementsList from './AddAnnouncements';
import HomeAnnounce from './HomeAnnounce';


const Home = () => {
    const{user} = use(AuthContext)
    console.log(user)
    return (
        <div>
            <HomePosts></HomePosts>
            <HomeAnnounce></HomeAnnounce>
          
        </div>
    );
};

export default Home;