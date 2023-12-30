import { Table } from "antd";
import moment from "moment";
import ExportTable from "antd-export-table";

export default function TableReport({ listDataTransaction, filteredData }: any) {
  const columns = [
    {
      title: "Transaction Type",
      dataIndex: "type_name",
      key: "type_name",
    },
    {
      title: "Account ID",
      dataIndex: "account_id",
      key: "account_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction Date",
      dataIndex: "transaction_date",
      key: "transaction_date",
      align: "center" as const,
      render: (text: string) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Transaction Description",
      dataIndex: "transaction_description",
      key: "transaction_description",
      align: "center" as const,
    },
  ];

  const processedData = filteredData.map((transaction: any) => ({
    ...transaction,
    transaction_date: moment(transaction.transaction_date).format("DD/MM/YYYY"),
  }));

  const { onPdfPrint } = ExportTable({
    columns,
    data: processedData,
    fileName: "Report_Transaction",
  });

  return (
    <div>
      <button
        className="flex justify-center text-end rounded-xl items-center text-white gap-4 w-[150px] h-[48px] bg-red-500 font-[600] text-[1.6rem]"
        onClick={onPdfPrint}
      >
        Export PDF
      </button>
      <Table
        dataSource={filteredData}
        columns={columns}
        style={{ flex: "1", flexGrow: "1" }}
        size="middle"
        pagination={{ pageSize: 8 }}
        rowClassName="text-center align-middle"
      />
      ;
    </div>
  );
}
