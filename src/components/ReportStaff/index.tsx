import DatePickerStaff from "../DatePickerStaff";
import TableReport from "../TableReport";

export default function ReportStaff() {
  return (
   <div>
    <h2>Tổng thu</h2>
      <div className="flex gap-10 mt-40">
        <DatePickerStaff />
        <div style={{width: "100%", height: 500}}>
          <TableReport />
        </div>
      </div>
   </div>
  );
}
