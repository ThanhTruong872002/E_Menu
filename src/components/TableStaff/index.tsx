export default function TableStaff() {
  const tables = [
    { id: 1, status: "available" },
    { id: 2, status: "inUse" },
    { id: 3, status: "reserved" },
    { id: 4, status: "available" },
    { id: 5, status: "inUse" },
    { id: 6, status: "reserved" },
    { id: 7, status: "available" },
    { id: 8, status: "inUse" },
    { id: 9, status: "reserved" },
    { id: 10, status: "available" },
    { id: 11, status: "inUse" },
    { id: 12, status: "reserved" },
    { id: 13, status: "available" },
    { id: 14, status: "inUse" },
    { id: 15, status: "reserved" },
    { id: 16, status: "available" },
    { id: 17, status: "inUse" },
    { id: 18, status: "reserved" },
    { id: 19, status: "available" },
    { id: 20, status: "inUse" },
    { id: 21, status: "reserved" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },
    { id: 19, status: "available" },


  ];
  return (
    <div>
      <div className="flex gap-10 text-[2rem] font-[500]">
        <h2 className="text-[#182FFF] font-[600]">Tất cả</h2>
        <h2>Lầu 2</h2>
        <h2>Lầu 3</h2>
        <h2>Phòng Vip</h2>
      </div>
      <div className="w-full bg-black my-6 h-[1px]"></div>
      <div className="flex flex-col gap-4 text-[2rem] font-[600]">
        <h2>
          Sử dụng: <span className="text-[#182FFF] ml-2">6/32</span>
        </h2>
        <h2>
          Đặt trước: <span className="text-[#24FF00] ml-2">2/32</span>
        </h2>
      </div>
      <div className="pt-10 pl-20 grid grid-cols-8 grid-rows-5 gap-20">
        {tables.map((table) => (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M78.4064 17.0517H1.59359C0.713438 17.0517 0 17.7653 0 18.6454V23.8247C0 24.7048 0.713438 25.4183 1.59359 25.4183H6.31328L8.60875 61.4559C8.66219 62.295 9.35844 62.9483 10.1992 62.9483H14.1833C15.0634 62.9483 15.7769 62.2348 15.7769 61.3547V25.4183H64.0638V61.3545C64.0638 62.2347 64.7772 62.9481 65.6573 62.9481H69.6414C70.4822 62.9481 71.1784 62.2948 71.2319 61.4558L73.5273 25.4181H78.4064C79.2866 25.4181 80 24.7047 80 23.8245V18.6453C80 17.7653 79.2866 17.0517 78.4064 17.0517ZM12.5897 59.7609H11.6945L9.50703 25.4183H12.5895L12.5897 59.7609ZM68.1461 59.7609H67.2509V25.4183H70.3334L68.1461 59.7609ZM76.8128 22.2311H3.18719V20.239H76.8127L76.8128 22.2311Z"
                fill={` ${
                  table.status === "available" ? "#000" : table.status === "inUse"? "#24FF00": table.status === "reserved"? "#182FFF": ""
                }`}
              />
            </svg>
            <h2 className="ml-8 text-[1.6rem] font-[500]">{table.id}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
