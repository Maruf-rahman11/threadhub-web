import React, { use } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Thread from '../../assets/thread logo.png';
import { AuthContext } from '../../Contexts/AuthContext';
import { FaBell } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';

const Navbar = () => {
    const { user, signOutUser, loading } = use(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const { data: announcements = [] } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosSecure.get("/announcements");
            return res.data;
        },
    });

    
  const handleClick = () => {
    Swal.fire({
      icon: "info",
      title: `
    Check out announcement section 
    <span style="display:block; font-size: 2rem; margin-top: 10px;">⬇️</span>
  `,
      showConfirmButton: true,
    });
  };

    const success = () => toast.success("Logged out Successful", { autoClose: 2000 });

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                success();
                navigate('/');
            })
            .catch(error => console.log(error));
    };

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div>
            <div id="navbar" className="navbar bg-[#4e5dfe] shadow-sm">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[#4e5dfe] rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <NavLink to='/'><li className='font-semibold cursor-pointer text-white'>Home</li></NavLink>
                            <NavLink to='/membership'><li className='font-semibold cursor-pointer text-white'>Membership</li></NavLink>
                            <NavLink to='/dashboard'><li className='font-semibold cursor-pointer text-white'>Dashboard</li></NavLink>
                        </ul>
                    </div>
                    <img className='w-[140px] h-[60px]' src={Thread} alt="" />
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu gap-4 menu-horizontal px-1">
                        <NavLink to='/'><li className="font-semibold cursor-pointer text-white">Home</li></NavLink>
                        <NavLink to='/membership'><li className="font-semibold cursor-pointer text-white">Membership</li></NavLink>
                        <NavLink to='/dashboard'><li className="font-semibold cursor-pointer text-white">Dashboard</li></NavLink>
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className="relative cursor-pointer" onClick={handleClick}>
                                <FaBell size={24} className="text-white" />
                                {announcements.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {announcements.length}
                                    </span>
                                )}
                            </div>

                            {/* Dropdown for user profile */}
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt="User" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
                                >
                                    <li className="font-semibold text-gray-700 cursor-default">{user.displayName}</li>
                                    <li>
                                        <NavLink to='/dashboard'>Dashboard</NavLink>
                                    </li>
                                    <li>
                                        <button className="text-red-600" onClick={handleSignOut}>
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className='flex gap-2 items-center'>
                            <NavLink to='/notification'><FaBell size={20} className="text-white" /></NavLink>
                            <Link to='/auth/register'><button className="btn">Sign up</button></Link>
                            <Link to='/auth/login'><button className="btn">Log in</button></Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
