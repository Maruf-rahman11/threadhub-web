import React from 'react';

const saveUserToDB = async (user, axiosInstance) => {
    try {
      const res = await axiosInstance.post("/users", {
        displayName: user.displayName,
        email: user.email,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };
  

export default saveUserToDB;