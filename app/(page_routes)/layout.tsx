
import Navbar from "@/components/Navbar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className="bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 duration-300 px-28 py-5">
            <Navbar />
            {children}
            </body>
    );
}


