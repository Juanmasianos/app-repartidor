import { currentApiVersion, usersMapping } from "@/app/constants/apiConstants";
import { getData } from "./data-service";
import { AddressDTO } from "@/models/User";


export const getOrderAddress = async (customerId: number) : Promise<AddressDTO | null> => {

  try {
    const response = await getData(`${currentApiVersion}${usersMapping}/${customerId}`) as any;

    const customerAddress = Array.isArray(response) ? response : response.data.data.address;
    
    return customerAddress as AddressDTO;

  } catch (error: any) {
    console.error("--- DEBUG ERROR EN SERVICIO ---");
    console.error("Status:", error.response.status);
    return null;
  }

};