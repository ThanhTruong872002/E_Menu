import { LocationType } from "../types/LocationType";
import http from "../utils/http";

export const getLocationData = () => http.get<LocationType[]>("api/locations")