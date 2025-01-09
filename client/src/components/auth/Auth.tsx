import React from "react";
import { UserData } from "../../routes/Profile";
import AddCarToDB from "../AddCarToDB";
import Login from "./Login";
import Register from "./Register";
import { NavLink } from "react-router";

type AuthProps = {
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register" | "reset-password" | "logged-in">>;
  authMode: "login" | "register" | "reset-password" | "logged-in";
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  userData: UserData;
};

const Auth: React.FC<AuthProps> = ({ setAuthMode, authMode, setUserData, userData }) => {
  const handleLogOut = () => {
    const confirmation = confirm("Are you sure you want to log out");
    if (!confirmation) {
      return;
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthMode("login");
    return setUserData({
      userCars: [],
      userID: "",
      username: "",
    });
  };

  return (
    <div className=" w-1/3 flex flex-col justify-start h-full p-6">
      <NavLink to="/" className="mb-6">
        Home
      </NavLink>
      {authMode === "logged-in" ? (
        <>
          <div className="flex justify-around items-center mb-7">
            <h1 className="text-bold text-2xl">Welcome back {userData?.username}</h1>
            <button onClick={() => handleLogOut()}>Log Out</button>
          </div>
          <AddCarToDB userID={userData?.userID ?? ""} setUserData={setUserData} />
        </>
      ) : authMode === "login" ? (
        <Login setAuthMode={setAuthMode} />
      ) : authMode === "register" ? (
        <Register setAuthMode={setAuthMode} />
      ) : null}
    </div>
  );
};
export default Auth;
