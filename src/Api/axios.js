import axios from "axios";
import { BaseUrl } from "./api";
import Cookie from 'cookie-universal';

const cookie=Cookie();
const token=cookie.get("e-commerce");

export const Axios=axios.create({
    baseURL:BaseUrl,
    headers:{
        Authorization:`Bearer ${token}`
    }
})