// import React from 'react'
import axios from "axios";
import { Config } from "./config";

export async function activeTypeServices() {
    let acceso;
    await axios({
        method: "get",
        url: Config().endpoint1 + "api/services/activeTypes",//quoteTypes
        headers: { Authorization: sessionStorage.getItem("token") },
    })
        .then((response) => {
            if (response.data.success) {
                acceso = response.data;
            } else {
                acceso = response.data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
    return acceso;
}

export async function GetAllServices() {
    let acceso;
    await axios({
        method: "get",
        url: Config().endpoint1 + "api/services/types",
        headers: { Authorization: sessionStorage.getItem("token") },
    })
        .then((response) => {
            if (response.data.success) {
                acceso = response.data;
            } else {
                acceso = response.data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
    return acceso;
}

export async function PostCreateServices(data: any) {
    let acceso;
    await axios({
        method: "post",
        url: Config().endpoint1 + "api/services/types/storeRecord",
        headers: { Authorization: sessionStorage.getItem("token") },
        data: data,
    })
        .then((response) => {
            if (response.data.success) {
                acceso = response.data;
            } else {
                acceso = response.data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
    return acceso;
}

export async function PutCreateServices(data: any) {
    let acceso;
    await axios({
        method: "put",
        url: Config().endpoint1 + "api/services/typeEdit",
        headers: { Authorization: sessionStorage.getItem("token") },
        data: data,
    })
        .then((response) => {
            if (response.data.success) {
                acceso = response.data;
            } else {
                acceso = response.data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
    return acceso;
}
