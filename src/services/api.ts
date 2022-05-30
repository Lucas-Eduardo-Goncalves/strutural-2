import axios from "axios";

export const api = axios.create({
  baseURL: "https://strutural.webi9.com.br/api/",
})