import React from "react";

import CarPreview from "./CarPreview";
import { CarType } from "../routes/Profile";
import { IoMdClose } from "react-icons/io";

type CarProps = {
  handleRemoveCar?: (vinNumber: string) => Promise<void>;
  car: CarType;
  setGalleryState: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const Car: React.FC<CarProps> = ({ car, handleRemoveCar, setGalleryState, setGalleryImages }) => {
  return (
    <div className="  relative flex flex-col w-full my-6" key={Math.random()}>
      {handleRemoveCar ? (
        <div className="absolute z-10 top-8 right-8 cursor-pointer flex w-20 justify-end group">
          <IoMdClose onClick={() => handleRemoveCar(car.vinNumber)} size={30} />
          <p className="absolute whitespace-nowrap  -bottom-12 bg-white opacity-0 group-hover:opacity-100 group-hover:duration-200 duration-200 pointer-events-none text-black p-2 rounded">
            Remove Car
          </p>
        </div>
      ) : null}

      <div className="flex items-center">
        <CarPreview car={car} setGalleryState={setGalleryState} setGalleryImages={setGalleryImages} />
        <div className="mx-6 w-full">
          <p>Name: {car.name}</p>
          <p>Model Year: {car.year}</p>
          <p>Odometer: {Intl.NumberFormat("en-US").format(car.odometer)} km</p>
          <p>Address: {car.address}</p>
          <p className="capitalize">Fuel Type: {car.fuelType}</p>
        </div>
      </div>
    </div>
  );
};
export default Car;
