import DatePickerStaff from "../DatePickerStaff";
import TableReport from "../TableReport";
import { ExportFileIcon } from "../common/icons/icons";

export default function ReportStaff() {
  return (
    <div>
      <div className="flex gap-10 mt-10">
        <DatePickerStaff />
        <div style={{ width: "100%", height: 500 }}>
          <div>
            <div className="flex justify-center text-end rounded-xl items-center gap-4 w-[180px] h-[48px] bg-[#24FF00]">
              <ExportFileIcon />
              <h2 className="font-[600] text-[2rem]">Xuất file</h2>
            </div>
            <h2 className="text-start  pt-10 font-semibold text-[2rem] pb-10">
              Tổng thu:{" "}
              <span className="text-[#182FFF] ml-4 text-[2.2rem]">6.500.000 VND</span>
            </h2>
          </div>
          <TableReport />
        </div>
      </div>
    </div>
  );
}
