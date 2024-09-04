import { format } from 'timeago.js';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AiFillDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import { toast } from 'sonner';
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
import { useTheme } from '@mui/material/styles';






interface Props {
    type: string;
}

export default function AllUsers({ type }: Props) {
    const { isLoading, data, error , refetch } = useGetAllUsersQuery({} , { refetchOnMountOrArgChange: true });
    const [updateUserRole , {isSuccess: roleSuccess , error: roleError}] = useUpdateUserRoleMutation();
    const [deleteUser , {isSuccess: deleteSuccess , error: deleteError}] = useDeleteUserMutation();
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const theme = useTheme();


    React.useEffect(() => {
        if (roleSuccess) {
            toast.success('User added successfully')
            refetch()
        }

        if (deleteSuccess) {
            toast.success('User deleted successfully')
            refetch()
        }

        if (deleteError) {
            toast.error('Error deleting user')
        }

        if (roleError) {
            toast.error('Error adding user')
        }
    }, [roleSuccess, roleError, deleteSuccess, deleteError])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users</div>;

    let rows = []

   if (type === 'team') {
        const team_members = data?.users?.filter((user: any) => user.role === 'admin') || [];
        rows = team_members.map((user: any, index: number) => ({
           id: user._id,
           name: user.name,
           email: user.email,
           role: user.role,
           purchasedCourses: user.courses.length,
           joinedAt: format(user.createdAt),
       })) || [];
    
   } else {
        rows = data?.users?.map((user: any, index: number) => ({
           id: user._id,
           name: user.name,
           email: user.email,
           role: user.role,
           purchasedCourses: user.courses.length,
           joinedAt: format(user.createdAt),
       })) || [];
   }


    const handleAddMember = () => {
        const user = data.users.filter((user: any) => user.email === email)
        if (user.length === 0) {
            toast.error('User not found')
            return;
        }
        updateUserRole({id: user[0]._id, role: 'admin'})
        setOpen(false);
    };


    const handleEmailClick = (email: string) => {
        window.location.href = `mailto:${email}`;
    };


    const handleDeleteClick = (id: string) => {
        deleteUser({ id })
    };



    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1.5 },
        { field: 'role', headerName: 'Role', flex: 0.75, cellClassName: 'text-center' },
        {
            field: 'purchasedCourses',
            headerName: 'Purchased Courses',
            flex: 1,
            cellClassName: 'text-center'
        },
        {
            field: 'joinedAt',
            headerName: 'Joined At',
            flex: 1,
            cellClassName: 'text-center'
        },
        {
            field: 'emailIcon',
            headerName: 'Email',
            flex: 0.5,
            renderCell: (params) => (
                <div
                    className="flex justify-center items-center w-full h-full cursor-pointer"
                    onClick={() => handleEmailClick(params.row.email)}
                >
                    <MdEmail size={20} className="text-blue-600" />
                </div>
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
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user
                                    and remove their data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteClick(params.row.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            ),
        },
    ];

    

    return (
        <div className=" min-h-screen bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 relative">
            <h1 className='font-bold text-4xl mb-6 dark:text-slate-100 text-slate-800'>Users</h1>

            {type === 'team' && (
                <div className='flex justify-end items-center w-[95%]'>
                    <button onClick={() => setOpen(true)} className=" text-slate-800 dark:text-white rounded-xl font-semibold bg-cyan-400 px-4 py-2 shadow-lg my-4  ">Add Member</button>
                </div>
            )}
            <div style={{ minHeight: 500, width: '95%' }}  >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params => {
                        
                        // if (params.row.role === 'admin') {
                        //     return 'bg-cyan-100 dark:bg-cyan-700 text-cyan-800 dark:text-cyan-200'
                        // }
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

            {
                open && (
                    <div className='absolute top-4 left-34 rounded-xl p-6 bg-slate-400 dark:bg-slate-700 text-white shadow-lg shadow-black dark:shadow-white '>
                        
                       <div className='space-y-3'>
                           <div className='flex flex-col gap-2'>
                                <label>
                                    Enter the email of the user you want to add
                                </label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='border-none text-slate-600 dark:text-slate-200 px-3 py-2 rounded-lg' />

                           </div>

                            <div className=' flex justify-center items-center gap-2'>
                                <button onClick={() => setOpen(false)} className='bg-black px-4 py-2 rounded-xl font-semibold'>Cancel</button>
                                <button onClick={handleAddMember} className="bg-cyan-400 px-4 py-2 rounded-xl font-semibold">Add</button>
                                
                            </div>
                       </div>

                    </div>
                )
            }
        </div>
    );
}
