import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "sonner";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [subTitle, setSubTitle] = React.useState("");

  const { data } = useGetLayoutQuery("Banner");

  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  useEffect(() => {
    setTitle(data?.layout?.banner.title);
    setSubTitle(data?.layout?.banner.subTitle);
    setImage(data?.layout?.banner.image.url);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated Successfully");
    }
    if (error) {
      toast.error("Failed to update");
    }
  }, [isSuccess, error]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    updateLayout({
      type: "Banner",
      image: image,
      title: title,
      subTitle: subTitle,
    });
  };

  function handleAvatar(e: any) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        setImage(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 py-28 px-5 ">
      <div className="grid grid-cols-12 gap-8">
        <div className=" col-span-5 relative w-fit rounded-full">
          <Image
            src={image}
            alt="avatar"
            width={500}
            height={500}
            className="shadow-md border border-slate-300 p-5 dark:border-slate-800  shadow-slate-300 dark:shadow-slate-900 bg-cover bg-center h-full w-full"
          />
          <input
            type="file"
            onChange={handleAvatar}
            className="hidden"
            name="avatar"
            id="avatar"
          />
          <label htmlFor="avatar">
            <div className="absolute h-[30px] w-[30px] right-3 bottom-3 cursor-pointer rounded-full dark:bg-[#4b33556e] bg-[#cb9be06e] flex justify-center items-center">
              <AiOutlineCamera
                className="z-1 dark:text-slate-100 text-slate-800 "
                size={20}
              />
            </div>
          </label>
        </div>

        <div className="col-span-7 h-auto">
          <form
            onSubmit={handleEdit}
            className="flex flex-col space-y-5 w-full h-auto"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="title" className="text-sm dark:text-slate-100">
                Title
              </label>
              <div
                contentEditable
                onInput={(e) => setTitle(e.currentTarget.textContent || "")}
                className="bg-transparent dark:text-white border-none focus:outline-none text-3xl w-full h-auto break-words"
                style={{ whiteSpace: "pre-wrap" }}
                suppressContentEditableWarning={true}
              >
                {title}
              </div>
            </div>
            <div className="flex flex-col space-y-2 h-auto">
              <label htmlFor="subTitle" className="text-sm dark:text-slate-100">
                Sub Title
              </label>
              <div
                contentEditable
                onInput={(e) => setSubTitle(e.currentTarget.textContent || "")}
                className="bg-transparent dark:text-white border-none focus:outline-none text-2xl w-full h-auto break-words"
                suppressContentEditableWarning={true}
              >
                {subTitle}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-900 text-white p-2 rounded-md w-36"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
