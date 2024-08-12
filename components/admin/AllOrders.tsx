import { format } from 'timeago.js';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetAllOrdersQuery } from '@/redux/features/orders/orderApi';

interface Props { }

export default function AllOrders(props: Props) {
    const { data } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });

    let rows = data?.orders?.map((order: any, index: number) => ({
        id: order?._id,
        email: order?.user?.email,
        course: order?.course?.name,
        placedAt: format(order.createdAt),
        price: order?.course?.price
    })) || [];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 1.5 },
        { field: 'course', headerName: 'Course', flex: 1 },
        { field: 'placedAt', headerName: 'Placed At', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
    ];

    return (
        <div className=" relative">
            <div style={{  width: '95%' }} >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={() => 'dark:bg-slate-600 dark:text-white'}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    className='dark:bg-slate-600 dark:text-white '
                    rowSelection={false}
                />
            </div>
        </div>
    );
}