import { useQuery } from "react-query";
import { getMenuData } from "../../apis/menu.api";

export default function CustomerListItem() {
  const { data } = useQuery({
    queryKey: ["api/menu"],
    queryFn: () => getMenuData(),
  });

  console.log(data);
  return (
    <div className="grid grid-cols-4 w-[90%] mx-auto gap-10">
      {data?.data.map((item, index) => (
        <div
          key={index}
          className="mt-16 w-[300px] flex flex-col gap-10 items-center justify-center border border-w-[1px] border-solid border-[#ccc] pb-4 rounded-2xl"
        >
          <img
            src={`http://localhost:4000/uploads${item.Image}`}
            alt="NoImage"
            className="w-full h-[230px] object-cover rounded-2xl"
          />
          <h4 className="text-[#AD343E] text-[2.4rem] font-bold">
            {item.Price.toLocaleString()} VND
          </h4>
          <h2 className="font-sans text-[2rem] font-bold">
            {item.menu_item_name}
          </h2>
          <p className="w-[246px]  text-center font-sans text-[1.6rem] font-normal">
            {item.Description}
          </p>
        </div>
      ))}
    </div>
  );
}
