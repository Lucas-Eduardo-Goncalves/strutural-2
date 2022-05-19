import axios from "axios";

export const api = axios.create({
  baseURL: "https://ciadosorriso.webi9.com.br/api/",
})