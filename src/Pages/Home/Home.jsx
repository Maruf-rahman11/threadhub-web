import React, { use } from 'react';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { FaBell } from 'react-icons/fa';
import HomePosts from './HomePosts';
import AnnouncementsList from './AddAnnouncements';
import HomeAnnounce from './HomeAnnounce';
import AboutUs from './AboutUs';
import CustomerReviews from './CustomerReviews';
import MembershipPlans from './MembershipPlans';
import CallToAction from './CallToAction';
import ActiveUsersChart from './ActiveUsersChart';


const Home = () => {
    const{user} = use(AuthContext)
    console.log(user)
    return (
        <div className='mt-30'>
            <section id="home-posts">
              <HomePosts></HomePosts>  
            </section>
            
            <HomeAnnounce></HomeAnnounce>
            <MembershipPlans></MembershipPlans>
            <AboutUs></AboutUs>
            <div>
   
      <ActiveUsersChart />
    </div>
            <CustomerReviews></CustomerReviews>
            <CallToAction></CallToAction>

          
        </div>
    );
};

export default Home;