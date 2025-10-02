import React, { use, useState } from "react";
import { useNavigate } from"react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, loading, updateUser } = use(AuthContext);
  const axiosSecure = useAxiosSecure()
  const [newName, setNewName] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // React Query to fetch user status
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userStatus", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only run if email exists
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        No user logged in.
      </div>
    );
  }

  const handleUpdateName = async () => {
    if (!newName.trim()) return alert("Please enter a valid name!");
    try {
      setUpdating(true);
      await updateUser({ displayName: newName });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Name Updated Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setNewName("");
    } catch (error) {
      console.error(error);
      alert("Failed to update name!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />

        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">{user.displayName || "No Name"}</h2>
          <span
            className={`px-2 py-1 rounded-full text-white text-sm ${
              userData?.status === "bronze"
                ? "bg-yellow-600"
                : userData?.status === "silver"
                ? "bg-gray-400"
                : "bg-yellow-500"
            }`}
          >
            {userData?.status?.toUpperCase() || "BRONZE"}
          </span>
        </div>

        <p className="text-gray-600">{user.email}</p>

        {/* Update Name */}
        <div className="w-full mt-4">
          <input
            type="text"
            placeholder="Enter new display name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            onClick={handleUpdateName}
            className="btn btn-primary w-full mt-2"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Name"}
          </button>
        </div>

        {/* Upgrade Button */}
        {userData?.status !== "gold" && (
          <button
            onClick={() => navigate("/payment")}
            className="btn btn-success w-full mt-2"
          >
            Upgrade to Gold
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
