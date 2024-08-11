'use client'
import AdminSideBar from "@/components/AdminSideBar";
import AdminProtected from "@/hooks/adminProtected";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminProtected>
            <body className="flex flex-row justify-center items-center bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 duration-300 ">
                <div className="w-[20%]">
                    <AdminSideBar />
                </div>
                <div className="w-[80%] ">
                    {children}

                </div>
            </body>
        </AdminProtected>
    );
}


