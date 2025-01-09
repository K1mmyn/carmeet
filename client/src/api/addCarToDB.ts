import { API_URL } from "./util";

export const addCarToDB = async (imagesToUpload: FileList, vinNumber: string, modelName:string, modelYear:number, carMake:string, odometer:number, address:string, fuelType:string) => {
  const formData = new FormData();

  for (let i = 0; i < imagesToUpload.length; i++) {
    formData.append("file[]", imagesToUpload[i]);
  }
  console.log(odometer, address, fuelType);
  
  

  const response = await fetch(
    `${API_URL}/car?modelName=${modelName}&vinNumber=${vinNumber}&modelYear=${modelYear}&carMake=${carMake}&odometer=${odometer}&address=${address}&fuelType=${fuelType}
`,
    {
      method: "POST",
      body: formData,
    }
  );
  return response.json();
};
