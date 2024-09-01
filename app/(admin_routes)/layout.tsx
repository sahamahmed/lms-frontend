'use client';
import AdminSideBar from "@/components/AdminSideBar";
import AdminProtected from "@/hooks/adminProtected";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtected>
      <div className="flex flex-row justify-center items-center bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 duration-300">
        <div className="w-[20%]">
          <AdminSideBar />
        </div>
        <div className="w-[80%] mt-24">
          {children}
        </div>
      </div>
    </AdminProtected>
  );
}
