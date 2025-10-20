import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import Thread from '../assets/thread logo.png';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation, FaUserCheck, FaUserClock, FaUserShield, FaMotorcycle, FaTasks, FaCheckCircle, FaWallet } from 'react-icons/fa';
import Navbar from '../Pages/Shared/Navbar';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Pages/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const DashboardLayout = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    console.log(user)
    const { data: userDb = [],  } = useQuery({
        queryKey: ["user", user.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${user.email}`);
          return res.data;
        },
      });
    console.log(userDb)
    const adminRole = userDb.role
   console.log(adminRole)
    if (loading) {
        return (
          <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        );
      }
      
      if (!user) {
        return (
          <div className="min-h-screen flex justify-center items-center">
            <p>Please log in to access the dashboard.</p>
          </div>
        );
      }
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer mt-20 lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none ">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                    </div>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    {/* Page content here */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink to="/dashboard/myProfile">
                                <FaHome className="inline-block mr-2" />
                                My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/addPost">
                                <FaBoxOpen className="inline-block mr-2" />
                                Add Posts
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/dashboard/myPosts`}>
                                    <FaMoneyCheckAlt className="inline-block mr-2" />
                                    My posts
                                </NavLink>
                            </li>
                        )}

                        {/* admin link */}
                        {adminRole === 'admin' ?
                        <>
                            <li>
                                <NavLink to="/dashboard/addAnnouncements">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Add Announcement
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allAnnouncements">
                                    <FaUserCheck className="inline-block mr-2" />
                                    All Announcements
                                </NavLink>
                            </li>
                           
                        </>:
                        <li></li>
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;