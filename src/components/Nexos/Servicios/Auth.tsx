// import React from 'react'
import axios from "axios";
import { Config } from "./config";

export async function PostLogin(data: any) {
    try {
        const response = await axios.post(
            Config().endpoint1 + "api/user/login",
            data
        );
        if (response.data.success) {
            const userObject = JSON.parse(response.data.user);
            sessionStorage.setItem("nombre", userObject.name);
            sessionStorage.setItem("token", userObject.token);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error en la petición" };
    }
}
