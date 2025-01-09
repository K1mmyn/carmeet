import { useEffect, useState } from "react";
import { CarType } from "./Profile";
import { getCarDataFromDB } from "../api/getCarDataFromDB";
import Car from "../components/Car";
import { NavLink } from "react-router";
import Gallery from "../components/Gallery";

function Home() {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [galleryState, setGalleryState] = useState(false);
  const [count, setCount] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const getCarData = async () => {
    const carData = await getCarDataFromDB();
    if (carData.message) return alert("No Cars in DB. Create an account and add a car");
    setCarData(carData);
  };

  useEffect(() => {
    getCarData();

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
  }, []);

  return (
    <div className="text-white">
      {galleryState ? (
        <Gallery count={count} galleryImages={galleryImages} setCount={setCount} setGalleryState={setGalleryState} />
      ) : null}
      <NavLink to="profile" className="absolute right-10 top-10">
        Profile
      </NavLink>
      <h1 className="text-center text-2xl font-bold m-10">Kim's Car trading site</h1>

      {/* Filers */}
      <div className="w-full  h-24 flex items-center p-8"></div>

      {/* Cars for sale */}
      <section className="grid gap-10 grid-cols-2 p-5 w-full">
        {carData.map((car) => {
          return (
            <Car car={car} key={Math.random()} setGalleryState={setGalleryState} setGalleryImages={setGalleryImages} />
          );
        })}
      </section>
    </div>
  );
}

export default Home;
