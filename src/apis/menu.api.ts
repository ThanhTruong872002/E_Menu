import { Category, MenuData } from "../types/MenuType";
import http from "../utils/http"


export const getMenuData = () => http.get<MenuData[]>("api/menu")
export const getTypeFood = () => http.get<Category[]>("api/types");
// export const postUploadImage = () => http.get<string | null>("api/uploadImage");
;