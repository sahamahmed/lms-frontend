import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
  user: any;
}

const UserPassword = ({ user }: Props) => {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] =
    React.useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = React.useState(false);

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const handlePassword = (e: any) => {
    e.preventDefault();
    updatePassword({ currentPassword, newPassword });
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password updated successfully");
    }

    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center mt-4 font-normal">
      <h1 className="text-2xl font-semibold text-[#4A1F64] dark:text-[#c7aae2]">
        Change Password
      </h1>
      <p className="text-lg text-slate-700 my-3 dark:text-slate-200">
        Logged in as{" "}
        <span className="font-semibold opacity-90">{user.email}</span>
      </p>

      <form
        onSubmit={handlePassword}
        className="flex flex-col gap-4 w-[60%] mt-4 font-normal"
      >
        <div>
          <label
            htmlFor="current-password"
            className="text-slate-700 font-semibold dark:text-slate-100"
          >
            Current Password
          </label>
          <div className="relative px-4 text-semibold py-2 rounded-lg   shadow-sm shadow-black mt-2 bg-slate-200 border text-slate-800 font-semibold p-2 dark:bg-[#534e5741] dark:border-gray-800 dark:text-slate-200">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="bg-transparent w-full border-0 outline-none focus:outline-none"
            />
            <div className="absolute right-2 bottom-3">
              {currentPasswordVisible ? (
                <FiEyeOff
                  onClick={() => setCurrentPasswordVisible(false)}
                  className="text-slate-800 cursor-pointer dark:text-slate-200"
                />
              ) : (
                <FiEye
                  onClick={() => setCurrentPasswordVisible(true)}
                  className="text-slate-800 cursor-pointer dark:text-slate-200"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="text-slate-700 font-semibold dark:text-slate-100"
          >
            New Password
          </label>
          <div className="relative px-4 text-semibold py-2 rounded-lg   shadow-sm shadow-black mt-2 bg-slate-200 border text-slate-800 font-semibold p-2 dark:bg-[#534e5741] dark:border-gray-800 dark:text-slate-200">
            <input
              type={newPasswordVisible ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="bg-transparent w-full border-0 outline-none focus:outline-none"
            />
            <div className="absolute right-2 bottom-3">
              {newPasswordVisible ? (
                <FiEyeOff
                  onClick={() => setNewPasswordVisible(false)}
                  className="text-slate-800 cursor-pointer dark:text-slate-200"
                />
              ) : (
                <FiEye
                  onClick={() => setNewPasswordVisible(true)}
                  className="text-slate-800 cursor-pointer dark:text-slate-200"
                />
              )}
            </div>
          </div>
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

export default UserPassword;