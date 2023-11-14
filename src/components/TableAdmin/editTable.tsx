import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Admin from '../../pages/admin';
import { Input, Select, Space, message } from 'antd';

interface ILocation {
  location_id: number;
  location_name: string;
}

interface ITableData {
  table_name: string;
  seat_capacity: number;
  location: number;
}

interface IEditTableForm extends ITableData {}

export default function EditTable() {
  const { table_id } = useParams();
  const navigate = useNavigate();
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [tableData, setTableData] = useState<ITableData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditTableForm>();

  useEffect(() => {
    console.log('Current table_id:', table_id);
  
    // Fetch location data from your API endpoint
    axios
      .get("http://localhost:4000/api/locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Fetch table data based on the table_id
    axios
      .get(`http://localhost:4000/api/tables/${table_id}`)
      .then((response) => {
        console.log('API Response:', response.data);
        const tableData = response.data;
        if (tableData) {
          console.log('Table Data:', tableData);
          setTableData(tableData);
          // Set form values using setValue
          setValue('table_name', tableData.table_name);
          setValue('seat_capacity', tableData.seat_capacity);
          setValue('location', tableData.location);
        } else {
          console.error('Dữ liệu bảng không xác định');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi truy xuất dữ liệu bảng:', error);
      });
  }, [table_id, setValue]); // Ensure that the dependencies array is closed
  
  const onSubmit: SubmitHandler<IEditTableForm> = async (data) => {
    try {
      // Send a request to update the table
      await axios.put(`http://localhost:4000/api/tables/${table_id}`, data);
  
      message.success('Table information has been updated successfully.');
      // Redirect to the table management page or another appropriate page
      navigate('/admin/table');
    } catch (error) {
      console.error('Error updating table information:', error);
      message.error('Failed to update table information.');
    }
  };
  
  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Edit Table Information</h2>
        <div>
          <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <h2 className="w-[170px]">Table Name :</h2>
              <label>
                <Input
                  className="ml-8 w-[720px]"
                  placeholder="Table Name"
                  value={tableData?.table_name || ''} // Sử dụng giá trị từ tableData
                  disabled
                />
              </label>
            </div>
  
            <div className="flex items-center mt-4">
              <h2 className="w-[170px]">Seat Capacity :</h2>
              <label className="mt-4">
                <Input
                  className="ml-8 w-[720px]"
                  type="number"
                  placeholder="Seat Capacity"
                  {...register('seat_capacity', {
                    required: 'Seat Capacity is required',
                    min: {
                      value: 1,
                      message: 'Seat Capacity must be at least 1',
                    },
                  })}
                  value={tableData?.seat_capacity || ''} // Sử dụng giá trị từ tableData
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.seat_capacity?.message}
                </div>
              </label>
            </div>
  
            <div className="flex items-center mt-4">
              <h2 className="w-[170px]">Location :</h2>
              <label className="mt-4">
              <Select
                style={{ width: 200, marginLeft: '20px' }}
                placeholder="Select Location"
                {...register('location')}
                value={
                  tableData?.location !== undefined
                    ? { target: { value: tableData.location }, type: 'number' }
                    : undefined
                }
              >
                {locations.map((location) => (
                  <Select.Option
                    key={location.location_id}
                    value={location.location_id}
                  >
                    {location.location_name}
                  </Select.Option>
                ))}
              </Select>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Save Changes
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}
