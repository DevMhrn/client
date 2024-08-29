import { axiosInstance } from "./index";
import { API_BASE_URL } from "./config";

export const registerUser = async(user)=>{
    try{
        const response = await axiosInstance.post(`${API_BASE_URL}/app/users/register`, user);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}
export const loginUser = async(user)=>{
    try{
        const response = await axiosInstance.post(`${API_BASE_URL}/app/users/login`, user);
        console.log(response);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export const getUsers = async()=>{
    try{
        const response = await axiosInstance.get(`${API_BASE_URL}/app/users/profile`);
        return response.data;
    }
    
    catch(error){
        return error.response.data;
    }
}