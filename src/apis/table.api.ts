import { PropsType } from "../types/TableType";
import http from "../utils/http";

export const getTableData = () => http.get<PropsType[]>("api/tables")