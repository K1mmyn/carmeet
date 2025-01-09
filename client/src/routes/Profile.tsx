import React, { useEffect, useState } from "react";
import { getUsersCarWithAccessToken } from "../api/getUsersCarWithAccessToken";
import { getUsersCarWithRefreshToken } from "../api/getUsersCarwithRefreshToken";
import Auth from "../components/auth/Auth";
import { removeCarFromUser } from "../api/removeCarFromUser";
import { removeCarFromDB } from "../api/removeCarFromDB";

import Car from "../components/Car";

import Gallery from "../components/Gallery";

type ProfileProps = {};

export type CarType = {
  vinNumber: string;
  carImageFileNames: string[];
  year: number;
  name: string;
  odometer: number;
  fuelType: string;
  address: string;
};

export type UserData = {
  userID: string;
  userCars: CarType[];
  username: string;
};

const Profile: React.FC<ProfileProps> = () => {
  const [authMode, setAuthMode] = useState<"login" | "register" | "reset-password" | "logged-in">("login");
  const [userData, setUserData] = useState<UserData>({
    userCars: [],
    userID: "",
    username: "",
  });

  const getUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      return;
    }
    const response = await getUsersCarWithAccessToken(accessToken);
    if (!response.message) {
      setAuthMode("logged-in");
      return setUserData({
        userID: response.userID,
        userCars: response.userCars,
        username: response.username,
      });
    }

    if (response.message !== "jwt expired") {
      return;
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken === null) {
      return;
    }
    const responseRefreshToken = await getUsersCarWithRefreshToken(refreshToken);

    localStorage.setItem("accessToken", responseRefreshToken.accessToken);
    setAuthMode("logged-in");
    return;
  };

  const handleRemoveCar = async (vinNumber: string) => {
    const confirmation = confirm("Are you sure you want to remove this car?");

    if (!confirmation) {
      return;
    }

    const userResponse = await removeCarFromUser(vinNumber, userData.userID);
    const carResponse = await removeCarFromDB(vinNumber);

    // !! What if one API request is successful but one isnt?

    console.log(userResponse, carResponse);

    if (userResponse.message || carResponse.message !== "Car has been successfully removed from DB!")
      return alert("Unable to delete car from user");
    else {
      setUserData({
        userID: userResponse.user._id,
        userCars: userResponse.user.carsOwned,
        username: userResponse.user.username,
      });
      return alert("Successfully removed car from user");
    }
  };

  useEffect(() => {
    getUserData();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the pressed key is ESC
      if (e.key === "Escape") {
        setCount(0);
        return setGalleryState(false);
      }
    };

    // Add a global event listener for keydown on the document
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [authMode]);

  const [count, setCount] = useState(0);
  const [galleryState, setGalleryState] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  return (
    <div className="w-full flex items-center justify-center h-[100vh]">
      {galleryState ? (
        <Gallery count={count} galleryImages={galleryImages} setCount={setCount} setGalleryState={setGalleryState} />
      ) : null}
      <Auth authMode={authMode} setAuthMode={setAuthMode} setUserData={setUserData} userData={userData} />
      <div className=" w-2/3  h-full flex flex-col">
        {userData?.userCars.map((car: CarType) => {
          // const [count, setCount] = useState(0);
          return (
            <Car
              handleRemoveCar={handleRemoveCar}
              car={car}
              setGalleryState={setGalleryState}
              setGalleryImages={setGalleryImages}
              key={Math.random()}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
