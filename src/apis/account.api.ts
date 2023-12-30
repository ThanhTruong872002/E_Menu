import { AccountType } from "../types/AccountType";
import http from "../utils/http";

export const getAccountData = () => http.get<AccountType[]>("api/accounts");
