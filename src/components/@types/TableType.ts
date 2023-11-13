export interface PropsType {
  table_id: string;
  table_name: string;
  seat_capacity: number;
  status: number;
  qr_code: {
    type: string;
    data: [];
  };
  location: number;
}
