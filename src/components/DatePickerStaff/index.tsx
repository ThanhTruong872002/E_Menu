import { DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useQuery } from "react-query";
import { getTransactionData } from "../../apis/transaction.api";
import { format } from "date-fns";
import { getAccountData } from "../../apis/account.api";

interface IAccountType {
  fullname: string;
  account_id: number;
}

export default function DatePickerStaff({
  setSelectedDate,
  selectedDate,
  setSelectedAccount,
  setFilteredData,
  selectedAccount,
}: any) {
  const [size, setSize] = useState<SizeType>("large");
  const [formattedTransactions, setFormattedTransactions] = useState<string[]>(
    []
  );
  const [listAccount, setListAccount] = useState<IAccountType[] | undefined>(
    []
  );

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
      const formatted = result.map((item) =>
        format(new Date(item.transaction_date), "yyyy-MM-dd")
      );
      setFormattedTransactions(formatted);
    }
  }, [isSuccess, result]);

  const { data, isSuccess: accountSuccess } = useQuery({
    queryKey: ["api/accounts"],
    queryFn: async () => {
      try {
        const res = await getAccountData();
        return res.data;
      } catch (error) {
        console.log("Error fetching transaction data:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setListAccount(data);
    }
  }, [accountSuccess, data]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleChange = (value: string) => {
    setSelectedAccount(value);
  };

  useEffect(() => {
    if (result && selectedDate && selectedAccount) {
      const filtered = result.filter(
        (item) =>
          format(new Date(item.transaction_date), "yyyy-MM-dd") ===
            selectedDate && item.account_id.toString() === selectedAccount
      );
      setFilteredData(filtered);
    }
  }, [result, selectedDate, selectedAccount]);
  return (
    <div className="w-[20%]">
      <div className="w-[300px] h-[400px] border-[1px] border-solid border-[#ccc]">
        <div>
          <h2 className=" flex justify-center items-center text-white w-[300px] h-[50px] bg-[#4B5DFF]">
            Thời gian giao dịch
          </h2>
          <div className="flex justify-center mt-4">
            {" "}
            <DatePicker
              onChange={onChange}
              size={size}
              className="text-black cursor-pointer "
              disabledDate={(current) => {
                // Chuyển đổi đối tượng Dayjs thành đối tượng Date
                const currentDate = current.toDate();
                // Không cho phép chọn ngày nếu nó không có trong formattedTransactions
                return !formattedTransactions.includes(
                  format(currentDate, "yyyy-MM-dd")
                );
              }}
            />
          </div>
        </div>
        <div>
          <h2 className=" mt-10 flex justify-center items-center text-white w-[300px] h-[50px] bg-[#4B5DFF]">
            Nhân viên phụ trách
          </h2>
          <div className="flex justify-center mt-4">
            <Select
              defaultValue="Tất cả"
              style={{ width: 200, height: 45 }}
              onChange={handleChange}
            >
              {listAccount?.map((account) => (
                <Select.Option
                  key={account.account_id}
                  value={account.account_id.toString()}
                >
                  {account.fullname}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
