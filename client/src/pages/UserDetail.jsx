import React from "react";
import { logOutUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const data = logOutUser();
    navigate("/");
  };
  return (
    <div>
      <button
        className="bg-primary hover:bg-teal-700 text-black font-bold py-2 px-4 rounded mr-2"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserDetail;
