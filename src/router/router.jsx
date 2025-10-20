import React from 'react';
import { createBrowserRouter } from "react-router";
import AuthLayout from '../Layouts/AuthLayout';
import HomeLayout from '../Layouts/HomeLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import Home from '../Pages/Home/Home';
import DashboardLayout from '../Layouts/DashboardLayout';
import MyProfile from '../Pages/Dashboard/My profile/MyProfile';
import AddPost from '../Pages/Dashboard/Add post/AddPost';
import MyPosts from '../Pages/Dashboard/My posts/MyPosts';
import PostDetails from '../Pages/Home/PostDetails';
import PrivateRoute from '../Routes/PrivateRoute';
import Payment from '../Pages/payment/Payment';
import Membership from '../Pages/Membership/Membership';
import Comments from '../Pages/Dashboard/AllComments/Comments';
import AddAnnouncements from '../Pages/Home/AddAnnouncements';
import AllAnnouncements from '../Pages/Home/AllAnnouncements';
import Forbidden from '../Pages/Shared/Forbidden';
import AdminRoute from '../Routes/AdminRoute';
import ErrorPage from '../Pages/Shared/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                 path: '/',
                 Component : Home
            },
            {
                path: '/postDetails/:id',
                element:<PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
            },
            {
                path: '/payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: '/membership',
                element:<PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
              path: '/forbidden',
              Component: Forbidden
            },
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [

            {
                path: '/auth/register',
                Component: Register,
            },
            {
                path: '/auth/login',
                Component: Login,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
            index: true, // This makes it the default when /dashboard is visited
            element: <PrivateRoute><MyProfile /></PrivateRoute>
          },
          {
            path: '/dashboard/myProfile',
            element: <PrivateRoute><MyProfile /></PrivateRoute>
          },
          {
            path: '/dashboard/addPost',
            element: <PrivateRoute><AddPost /></PrivateRoute>
          },
          {
            path: '/dashboard/myPosts',
            element: <PrivateRoute><MyPosts /></PrivateRoute>,
            
          },
          {
            path: '/dashboard/comments/:id',
            element : <PrivateRoute><Comments></Comments></PrivateRoute>
          },
          {
            path: '/dashboard/addAnnouncements',
            element :<AdminRoute><AddAnnouncements></AddAnnouncements></AdminRoute> 
          },
          {
            path: '/dashboard/allAnnouncements',
            element: <AdminRoute><AllAnnouncements></AllAnnouncements></AdminRoute> 
          }
          
        ]
      },
      {
        path : '*',
        Component : ErrorPage,
      }
      
]);

export default router;