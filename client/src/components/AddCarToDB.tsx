import React, { useState } from "react";
import { addCarToDB } from "../api/addCarToDB";
import { CarType, UserData } from "../routes/Profile";
import { addCarToUser } from "../api/addCarToUser";
import { getCarFileNames } from "../api/getCarFileNames";

type AddCarToDBProps = {
  userID: string;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

const AddCarToDB: React.FC<AddCarToDBProps> = ({ userID, setUserData }) => {
  const [imagesToUpload, setImagesToUpload] = useState<FileList>();
  const [vinNumber, setVinNumber] = useState("");
  const [modelName, setModelName] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [odometer, setOdometer] = useState("");
  const [address, setAddress] = useState("");

  const [preview, setPreview] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fuelTypeInput: any = document.getElementById("fuel-type");
    const fuelType = fuelTypeInput.value;

    if (!imagesToUpload || !vinNumber || !modelName || !modelYear || !carMake || !fuelType || !odometer) {
      return alert("Please provide required information");
    }

    const parsedModelYear = parseInt(modelYear);
    const parsedOdometer = parseInt(odometer);
    const currentYear = new Date().getFullYear();

    if (!parsedModelYear) {
      return alert("Model year must be a number");
    }

    if (!parsedOdometer) {
      return alert("Odometer value must be a number");
    }

    if (parsedModelYear > currentYear + 1) {
      return alert(`Model year cannot be greater than ${currentYear + 1}`);
    }

    const addCarToDBResponse = await addCarToDB(
      imagesToUpload,
      vinNumber,
      modelName,
      parsedModelYear,
      carMake,
      parsedOdometer,
      address,
      fuelType
    );
    const addCarToUserResponse = await addCarToUser(vinNumber, userID);

    if (addCarToDBResponse.message !== "Succefully uploaded car to DB" || !addCarToUserResponse.user) {
      return alert("Unable to upload your car to the database");
    }

    const newCarFileNames: CarType = await getCarFileNames(vinNumber);

    setImagesToUpload(undefined);
    setVinNumber("");
    setModelYear("");
    setModelName("");
    setCarMake("");
    setPreview([]);
    setOdometer("");
    setAddress("");

    setUserData((prev) => {
      return {
        userID: userID,
        userCars: [...prev.userCars, newCarFileNames],
        username: addCarToUserResponse.user.username,
      };
    });

    return alert("Car successfully uploaded");
  };

  const handleFileUpload = (e: any) => {
    const files = e.target.files;
    setPreview([]);

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const test: any = event.target?.result;
        setPreview((prev) => [...prev, test]);
      };
    }

    setImagesToUpload(files);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        multiple
        onChange={(e) => {
          handleFileUpload(e);
        }}
      />
      <label htmlFor="vin-number">Vin Number</label>
      <input
        onChange={(e) => setVinNumber(e.target.value)}
        value={vinNumber}
        className="text-black"
        type="text"
        name="vin-number"
        id="vin-number-input"
      />
      <label htmlFor="model-year">Model Year</label>
      <input
        onChange={(e) => setModelYear(e.target.value)}
        value={modelYear}
        className="text-black"
        type="text"
        name="model-year"
        id="model-year-input"
      />
      <label htmlFor="model-name">Model Name</label>
      <input
        onChange={(e) => setModelName(e.target.value)}
        value={modelName}
        className="text-black"
        type="text"
        name="model-name"
        id="model-name-input"
      />
      <label htmlFor="car-make">Car Make</label>
      <input
        onChange={(e) => setCarMake(e.target.value)}
        value={carMake}
        className="text-black"
        type="text"
        name="car-make"
        id="car-make-input"
      />
      <label htmlFor="fuel-type">Fuel Type</label>
      <select name="fuel-type" id="fuel-type" defaultValue="petrol" className="text-black">
        <option value="petrol">Petrol</option>
        <option value="hybrid">Hybrid</option>
        <option value="diesel">Diesel</option>
      </select>
      <label htmlFor="odometer">Odometer</label>
      <input
        onChange={(e) => setOdometer(e.target.value)}
        value={odometer}
        className="text-black"
        type="text"
        name="odometer"
        id="odometer-input"
      />
      <label htmlFor="address">Address</label>
      <input
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        className="text-black"
        type="text"
        name="address"
        id="address-input"
      />

      <button type="submit">Submit</button>
      <div className="grid grid-cols-4 gap-4">
        {preview.map((image: string) => (
          <img key={Math.random()} src={image} className="h-20" />
        ))}
      </div>
    </form>
  );
};
export default AddCarToDB;
