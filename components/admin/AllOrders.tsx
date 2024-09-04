import { format } from "timeago.js";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import Loader from "../Loader";

interface Props {}

export default function AllOrders(props: Props) {
  const { data , isLoading} = useGetAllOrdersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  

  let rows =
    data?.orders?.map((order: any, index: number) => ({
      id: order?._id,
      email: order?.user?.email,
      course: order?.course?.name,
      placedAt: format(order.createdAt),
      price: order?.course?.price,
    })) || [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "placedAt", headerName: "Placed At", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  if (isLoading) {
    return <div className='h-screen w-full'><Loader /></div>;

  }

  return (
    <div className=" relative min-h-screen bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950">
      <h1 className='font-bold text-4xl mb-6 dark:text-slate-100 text-slate-800'>Orders</h1>

      <div style={{ width: "95%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          classes={{
            columnHeader:
              "bg-purple-200 dark:bg-[var(--darkpurple)] dark:border-slate-800",
          }}
          getRowClassName={() =>
            "dark:bg-[var(--darker)]dark:border-gray-800 dark:text-slate:100"
          }
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          className=" dark:bg-[#534e5741] dark:border-gray-800 dark:text-white "
          rowSelection={false}
        />
      </div>
    </div>
  );
}
