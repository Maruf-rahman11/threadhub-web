import React, { Children, use } from 'react';
import { Navigate } from 'react-router';
import useAxiosSecure from '../Pages/Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

const AdminRoute = ({ children }) => {
    
     const axiosSecure = useAxiosSecure();
     const {user,loading } = use(AuthContext);
     

    const { data: userDb = [],  } = useQuery({
        queryKey: ["user", user.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${user.email}`);
          return res.data;
        },
      });
      const adminRole = userDb.role
      console.log(adminRole)

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || adminRole !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;