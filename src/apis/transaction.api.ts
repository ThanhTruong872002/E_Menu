import { TransactionType } from "../types/TransactionType";
import http from "../utils/http";

export const getTransactionData = () => http.get<TransactionType[]>("api/transactions");
