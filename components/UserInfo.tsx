import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
    useUpdateAvatarMutation,
    useUpdateInfoMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { AiOutlineCamera } from "react-icons/ai";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
    user: any;
}

const UserInfo = ({ user }: Props) => {
    const [name, setName] = React.useState(user.name || "");
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [updateInfo, { isSuccess: infoSuccess, error: infoError }] =
        useUpdateInfoMutation();
    const [loadUser, setLoaduser] = React.useState(false);
    const { } = useLoadUserQuery(undefined, {
        skip: !loadUser ? true : false,
    });

    function handleAvatar(e: any) {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result as string;
                updateAvatar(avatar);
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (isSuccess) {
            setLoaduser(true);
            toast.success("Avatar updated successfully");
        }

        if (error) {
            toast.error("something went wrong");
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (infoSuccess) {
            setLoaduser(true);
            toast.success("User Info updated successfully");
        }

        if (infoError) {
            toast.error("something went wrong");
        }
    }, [infoSuccess, infoError]);

    function handleInfo(e: any) {
        e.preventDefault();
        updateInfo(name);
    }

    return (
        <div className="flex flex-col  items-center">
            <div className="relative w-fit">
                <Image
                    src={user?.avatar?.url || "/user.png"}
                    alt="avatar"
                    width={200}
                    height={200}
                    className="rounded-full border border-purple-950 shadow-md shadow-black bg-cover bg-center h-48 w-48 "
                />
                <input
                    type="file"
                    onChange={handleAvatar}
                    className="hidden"
                    name="avatar"
                    id="avatar"
                />
                <label htmlFor="avatar">
                    <div className="absolute h-[30px] w-[30px] right-3 bottom-3 cursor-pointer rounded-full bg-slate-900 flex justify-center items-center">
                        <AiOutlineCamera className="z-1 text-white " size={20} />
                    </div>
                </label>
            </div>

            <form
                onSubmit={handleInfo}
                className="flex flex-col gap-4 w-[60%] mt-4 font-normal"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="text-slate-700 dark:text-slate-100 font-semibold"
                    >
                        User Name
                    </label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="shadow-sm shadow-black mt-2 bg-slate-200 border text-slate-800 font-semibold p-2 dark:bg-[#534e5741] dark:border-gray-800 dark:text-slate-200"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="text-slate-700 dark:text-slate-100 font-semibold"
                    >
                        Email
                    </label>
                    <Input
                        type="text"
                        id="email"
                        value={user.email || "abc@example.com"}
                        readOnly
                        className="shadow-sm shadow-black mt-2 bg-slate-200 border text-slate-800 font-semibold p-2 dark:bg-[#534e5741] dark:border-gray-800 dark:text-slate-200"
                    />
                </div>

                <Button
                    type="submit"
                    className="bg-purple-950 text-white w-[25%] mx-auto"
                >
                    Update
                </Button>
            </form>
        </div>
    );
};

export default UserInfo;
