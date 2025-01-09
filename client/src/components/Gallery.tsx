import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type GalleryProps = {
  galleryImages: string[];
  setGalleryState: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
};

const Gallery: React.FC<GalleryProps> = ({ count, setCount, galleryImages, setGalleryState }) => {
  const filename = galleryImages[count];
  return (
    <div className="absolute z-20 top-0 bottom-0 right-0 left-0 bg-black/50">
      <IoMdClose
        className="absolute top-10 right-10 z-30 cursor-pointer opacity-100 bg-black w-20"
        size={30}
        onClick={() => setGalleryState(false)}
      />
      <div className="flex justify-center items-center h-full ">
        <div className="w-[80rem] relative">
          <MdKeyboardArrowRight
            size={50}
            className="absolute top-1/2 translate-y-[-50%] right-0 rounded-lg z-10 bg-black opacity-50 hover:opacity-70 cursor-pointer duration-150"
            onClick={() => {
              if (count + 1 === galleryImages.length) {
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
                return setCount(galleryImages.length - 1);
              }
              setCount((prev) => prev - 1);
            }}
          />
          <img
            key={filename}
            src={`http://localhost:5001/api/v1/car/${filename}`}
            className="w-[80rem] h-[60rem] object-cover relative cursor-zoom-in"
            onClick={() => setGalleryState(true)}
          />
        </div>
      </div>
    </div>
  );
};
export default Gallery;
