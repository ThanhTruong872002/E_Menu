import DatePickerStaff from "../DatePickerStaff";
import TableReport from "../TableReport";
import { ExportFileIcon } from "../common/icons/icons";
import React, { useEffect, useState } from "react";
import { getTransactionData } from "../../apis/transaction.api";
import { useQuery } from "react-query";
import { TransactionType } from "../../types/TransactionType";

export default function ReportStaff() {
  const [listDataTransaction, setListDataTransaction] = useState<
    TransactionType[]
  >([]);

  const [totalPriceSale, setTotalPriceSale] = useState<number>();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState([]);

  console.log(filteredData);
  

  const { data: result, isSuccess } = useQuery({
    queryKey: ["api/transactions"],
    queryFn: async () => {
      try {
        const res = await getTransactionData();
        return res.data;
      } catch (error) {
        console.log("Error fetching transaction data:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setListDataTransaction(result);
      const totalPrice = result.reduce((total, item) => {
        const amount = item.amount;
        return total + amount;
      }, 0);
      setTotalPriceSale(totalPrice);
    }
  }, [isSuccess, result]);

  return (
    <div>
      <div className="flex gap-10 mt-10">
        <DatePickerStaff
          selectedDate={selectedDate}
          selectedAccount={selectedAccount}
          setSelectedDate={setSelectedDate}
          setSelectedAccount={setSelectedAccount}
          setFilteredData={setFilteredData}
        />
        <div style={{ width: "100%", height: 500 }}>
          <div>
            <h2 className="text-start  pt-10 font-semibold text-[2rem] pb-10">
              Tổng thu:{" "}
              <span className="text-red-500 ml-4 text-[2.2rem]">
                {totalPriceSale?.toLocaleString("en-US")} VND
              </span>
            </h2>
          </div>
          <TableReport listDataTransaction={listDataTransaction} filteredData = {filteredData}/>
        </div>
      </div>
    </div>
  );
}
