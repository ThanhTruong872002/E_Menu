import React, { useState, useEffect } from "react";

interface Order {
  id: number;
  table_id: number;
  status: number;
  order_date?: string;
  order_time: string;
}

interface Reservation {
  reservation_id: number;
  reservation_date: string;
  status: number;
  cus_name: string;
  cus_phone: string;
  number_of_guests: number;
}

export default function Notify() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tableNames, setTableNames] = useState<Record<number, string>>({});
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);


  useEffect(() => {
    // Fetch order data
    fetch("http://localhost:4000/api/tables/status/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { success: boolean; data: Order[] }) => {
        console.log("API Response:", data);

        // Check if the response is successful and data is present
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);

          // Fetch and store table_name for each table_id
          data.data.forEach((order: Order) => {
            fetch(`http://localhost:4000/api/tables/${order.table_id}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((tableData: { table_name: string }) => {
                setTableNames((prevTableNames) => ({
                  ...prevTableNames,
                  [order.table_id]: tableData.table_name,
                }));
              })
              .catch((error) => console.error("Error fetching table name:", error));
          });
        } else {
          console.error("Error in API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch reservation data
    fetch("http://localhost:4000/api/reservations")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { success: boolean; data: Reservation[] }) => {
        console.log("Reservation API Response:", data);

        // Check if the response is successful and data is present
        if (data.success && Array.isArray(data.data)) {
          setReservations(data.data);
        } else {
          console.error("Error in Reservation API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching reservation data:", error));
  }, []);

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const confirmReservation = () => {
    // Implement logic to confirm reservation
    // For example, you can make an API call to update the reservation status
    // After confirming, you may want to refresh the reservations list or update the local state
    // ...

    // Close the modal after confirming
    closeDetailsModal();
  };

  const closeDetailsModal = () => {
    setSelectedReservation(null);
  };

  return (
    <div className="flex justify-between">
      <div className="w-[50%] border-r border-black pr-4">
        <h2 className="font-[600] text-[2rem]">Order Food At The Table</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.isArray(orders) &&
            orders.map((order: Order) => (
              <div
                key={order.id}
                className="mt-10 p-4 w-[190px] h-auto flex flex-col gap-4 bg-gray-300 rounded-xl font-[400]"
              >
                <h2>
                  Table:{" "}
                  <span className="ml-4 font-[500]">
                    {tableNames[order.table_id] || `Loading...`}
                  </span>
                </h2>
                <h2>
                  Status: <span className="font-[500]">Unconfirmed</span>
                </h2>
                <h2>
                  Time: <span className="ml-5 font-[500]">{order.order_time}</span>
                </h2>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[50%] pl-4">
        <h2 className="font-[600] text-[2rem]">Booking</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.isArray(reservations) &&
            reservations.map((reservation: Reservation) => (
              <div
                key={reservation.reservation_id}
                className="mt-10 p-4 w-[225px] h-auto flex flex-col gap-4 bg-gray-300 rounded-xl font-[400]"
                onClick={() => handleReservationClick(reservation)}
              >
                <h2>
                  Name:{" "}
                  <span className="ml-4 font-[500]">{reservation.cus_name}</span>
                </h2>
                <h2>
                  Status: <span className="font-[500]">{reservation.status === 1 ? "Unconfirmed" : "Confirmed"}</span>
                </h2>
                <h2>
                  Time: <span className="ml-5 font-[500]">
                    {new Date(reservation.reservation_date).toLocaleDateString()}{" "}
                    {new Date(reservation.reservation_date).toLocaleTimeString()}
                  </span>
                </h2>
                <h2>
                  Guests:{" "}
                  <span className="ml-5 font-[500]">{reservation.number_of_guests}</span>
                </h2>
              </div>
            ))}
        </div>
      </div>
      {selectedReservation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md w-[400px] text-4xl">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={closeDetailsModal}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <h2 className="text-4xl font-semibold mb-4">Reservation Details</h2>
            <div className="mb-4">
              <strong>Name:</strong> {selectedReservation.cus_name}
            </div>
            <div className="mb-4">
              <strong>Phone:</strong> {selectedReservation.cus_phone}
            </div>
            <div className="mb-4">
              <strong>Status:</strong>{" "}
              {selectedReservation.status === 1 ? "UnConfirmed" : "Confirmed"}
            </div>
            <div className="mb-4">
              <strong>Time:</strong>{" "}
              {`${new Date(selectedReservation.reservation_date).toLocaleDateString()} 
              ${new Date(selectedReservation.reservation_date).toLocaleTimeString()}`}
            </div>
            <div className="mb-4">
              <strong>Guests:</strong> {selectedReservation.number_of_guests}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={confirmReservation}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeDetailsModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
 );
}
