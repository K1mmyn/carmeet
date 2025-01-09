import React, { useState } from "react";
import { CarType } from "../routes/Profile";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";

type CarPreviewProps = {
  car: CarType;
  setGalleryState: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const CarPreview: React.FC<CarPreviewProps> = ({ car, setGalleryState, setGalleryImages }) => {
  const [count, setCount] = useState(0);

  const filename = car.carImageFileNames[count];

  return (
    <div className="w-full relative max-w-96">
      <MdKeyboardArrowRight
        size={50}
        className="absolute top-1/2 translate-y-[-50%] right-0 rounded-lg z-10 bg-black opacity-50 hover:opacity-70 cursor-pointer duration-150"
        onClick={() => {
          if (count + 1 === car.carImageFileNames.length) {
            return setCount(0);
          }
          setCount((prev) => prev + 1);
        }}
      />
      <MdKeyboardArrowLeft
        size={50}
        className="absolute top-1/2 translate-y-[-50%] left-0 rounded-lg z-10 bg-black opacity-50 hover:opacity-70 cursor-pointer duration-150"
        onClick={() => {
          if (count === 0) {
            return setCount(car.carImageFileNames.length - 1);
          }
          setCount((prev) => prev - 1);
        }}
      />
      <div
        className="flex bg-black opacity-50 hover:opacity-80 cursor-pointer absolute left-1/2 translate-x-[-50%] bottom-0 rounded-lg z-10  duration-150 items-center justify-center p-2"
        onClick={() => {
          setGalleryState(true);
          return setGalleryImages(car.carImageFileNames);
        }}
      >
        <HiMagnifyingGlassPlus />
        <p className="text-sm mx-1">Open gallery</p>
      </div>
      <img
        key={filename}
        src={`http://localhost:5001/api/v1/car/${filename}`}
        className="w-96 h-72 object-cover relative cursor-zoom-in"
        onClick={() => {
          setGalleryState(true);

          return setGalleryImages(car.carImageFileNames);
        }}
      />
    </div>
  );
};
export default CarPreview;
