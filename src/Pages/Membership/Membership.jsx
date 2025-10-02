import React from 'react';
import { Link } from 'react-router';

const Membership = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 p-6">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Upgrade to Gold Membership
        </h2>
        <p className="text-gray-600 mb-6">
          Enjoy premium features and exclusive access by upgrading your account to Gold.
        </p>
        <Link to="/payment">
          <button className="btn btn-primary w-full text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Membership;
