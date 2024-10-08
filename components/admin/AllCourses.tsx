import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import { format } from 'timeago.js';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import Link from 'next/link';
import Loader from '../Loader';



export default function AllCourses() {
    const { isLoading, data, refetch } = useGetAllCoursesQuery({} , {refetchOnMountOrArgChange: true});
    const [deleteCourse, { isSuccess, error}] = useDeleteCourseMutation();

    React.useEffect(()=> {
        if (isSuccess) {
            refetch()
            toast.success('Course deleted successfully')

        }

        if (error) {
            toast.error('Error deleting course')
        }
    }, [isSuccess, error])

    const handleDeleteClick = (id: string) => {
        deleteCourse({ id })
    };

    if (isLoading) {
        return <div className='h-screen w-full'><Loader /></div>;
        
    }

    const rows = data?.courses?.map((course: any, index: number) => ({
        id: course._id,
        title: course.name,
        ratings: course.ratings.toFixed(1),
        purchased: course.purchased,
        createdAt: format(course.createdAt),
    })) || [];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Course Title', flex: 1.5 },
        {
            field: 'ratings',
            headerName: 'Ratings',
            flex: 0.75,
            cellClassName: 'text-center'
        },
        {
            field: 'purchased',
            headerName: 'Purchased',
            flex: 0.75,
            cellClassName: 'text-center'
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1.2,
            cellClassName: 'text-center pl-4',
            headerClassName: 'text-center pl-4'
        },
        {
            field: 'edit',
            headerName: 'Edit',
            flex: 0.5,
            renderCell: (params) => (
                <Link href={`/admin/edit-course/${params.row.id}`} className="flex justify-center items-center w-full h-full">
                    <MdEdit size={20} className="text-blue-600" />
                </Link>
            ),
        },
        {
            field: 'deleteIcon',
            headerName: 'Delete',
            flex: 0.5,
            renderCell: (params) => (
                <div
                    className="flex justify-center items-center w-full h-full cursor-pointer"
                >
                    <AlertDialog>
                        <AlertDialogTrigger><AiFillDelete size={20} className="text-red-600" /></AlertDialogTrigger>
                        <AlertDialogContent className='dark:bg-slate-200'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the course
                                    and remove their data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='dark:bg-white hover:text-black'>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-red-600 dark:bg-red-600 hover:bg-red-700 text-white' onClick={() => handleDeleteClick(params.row.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            ),
        },
    ];

    return (
        <div style={{ minHeight: 500, width: '95%' }} className="">
            <h1 className='font-bold text-4xl mb-6 dark:text-slate-100 text-slate-800'>Courses</h1>

            <DataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params => {
                    return 'dark:bg-slate-600 dark:text-white'
                })}
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
    );
}
