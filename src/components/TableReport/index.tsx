import { Table } from "antd";
import React from "react";

export default function TableReport() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "3",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phương thức thanh toán ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng tiền ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thời gian giao dịch ",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ flex: "1", flexGrow: "1" }}
        size="middle"
      />
      ;
    </div>
  );
}
