
import AdminSideBar from "@/components/AdminSideBar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className="flex flex-row justify-center items-center ">
            <div className="w-[20%]">
                <AdminSideBar />
            </div>
            <div className="w-[80%] ">
                {children}

            </div>
        </body>
    );
}


