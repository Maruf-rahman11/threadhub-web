import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";


const ErrorPage = ({ code = "404", message = "Page Not Found" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 text-center">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-6 animate-bounce" />
      <h1 className="text-6xl font-bold mb-4">{code}</h1>
      <p className="text-xl md:text-2xl text-base-content/70 mb-8">{message}</p>

      <Link to="/" className="btn btn-primary btn-lg hover:scale-105 transition-transform">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
