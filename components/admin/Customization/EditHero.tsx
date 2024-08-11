import { useGetLayoutQuery, useUpdateLayoutMutation } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { toast } from 'sonner';

type Props = {};

const EditHero = (props: Props) => {
    const [image, setImage] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [subTitle, setSubTitle] = React.useState('');

    const { data } = useGetLayoutQuery('Banner');

    const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

    useEffect(() => {
        setTitle(data?.layout?.banner.title);
        setSubTitle(data?.layout?.banner.subTitle);
        setImage(data?.layout?.banner.image.url);
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Updated Successfully');
        }
        if (error) {
            toast.error('Failed to update');
        }
    }, [isSuccess, error]);

    const handleEdit = async (e:any) => {
        e.preventDefault()
        updateLayout({
            type: 'Banner',
            image: image,
            title: title,
            subTitle: subTitle,
        })
        
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
        <div className='w-full py-28 px-5'>
            <div className='grid grid-cols-12'>
                <div className=' col-span-5 relative w-fit border dark:border-white rounded-full'>
                    <Image src={image} alt='avatar' width={500} height={500} className='shadow-md shadow-black bg-cover bg-center h-full w-full' />
                    <input type='file' onChange={handleAvatar} className='hidden' name='avatar' id='avatar' />
                    <label htmlFor="avatar">
                        <div className='absolute h-[30px] w-[30px] right-3 bottom-3 cursor-pointer rounded-full bg-slate-900 flex justify-center items-center'>
                            <AiOutlineCamera className='z-1 dark:text-white ' size={20} />
                        </div>
                    </label>
                </div>

                <div className='col-span-7 h-auto'>
                    <form onSubmit={handleEdit} className='flex flex-col space-y-5 w-full h-auto'>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="title" className='text-sm'>Title</label>
                            <div
                                contentEditable
                                onInput={(e) => setTitle(e.currentTarget.textContent || '')}
                                className='bg-transparent dark:text-white border-none focus:outline-none text-3xl w-full h-auto break-words'
                                style={{ whiteSpace: 'pre-wrap' }}
                                suppressContentEditableWarning={true}
                            >
                                {title}
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 h-auto'>
                            <label htmlFor="subTitle" className='text-sm'>Sub Title</label>
                            <div
                                contentEditable
                                onInput={(e) => setSubTitle(e.currentTarget.textContent || '')}
                                className='bg-transparent dark:text-white border-none focus:outline-none text-2xl w-full h-auto break-words'
                                suppressContentEditableWarning={true}
                            >
                                {subTitle}
                            </div>
                        </div>

                        <div className="flex justify-end">
                                    <button type='submit' className='bg-cyan-500 text-white p-2 rounded-md w-36'>Update</button>

    
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditHero;
