import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast } from "sonner";

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData = ({
    benefits,
    setBenefits,
    setActive,
    active,
    prerequisites,
    setPrerequisites,
}: Props) => {
    const handleBenefitChange = (index: number, value: any) => {
        benefits[index].title = value;
        setBenefits([...benefits]);
    };

    const handleAddbenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    //   console.log(benefits)

    //   console.log(prerequisites)

    const handlePrerequisiteChange = (index: number, value: any) => {
        prerequisites[index].title = value;
        setPrerequisites([...prerequisites]);
    };
    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    return (
        <div className="w-[80%] ml-8 mt-24 mb-6 dark:text-white">
            <h2 className="text-2xl font-bold">Course Data</h2>

            <div className="mt-8">
                <h4 className="text-xl text-slate-700 dark:text-slate-200 font-bold">
                    What Benefits does the course provide?
                </h4>
                {benefits.map((benefit, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={benefit.title}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                            className="border w-full mt-2 border-gray-300 rounded-md p-2 dark:bg-[#534e5741] dark:border-gray-800"
                        />
                    </div>
                ))}
                <IoAddCircleSharp
                    className="text-[#4A1F64] dark:text-[#c093dbb9] mt-6 cursor-pointer"
                    size={32}
                    onClick={handleAddbenefit}
                />
            </div>

            <div className="mt-8">
                <h4 className="text-xl dark:text-slate-200 text-slate-700 font-bold">
                    What are the pre requisites of the course?
                </h4>
                {prerequisites.map((prerequisite, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={prerequisite.title}
                            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                            className=" w-full mt-2 border border-gray-300 rounded-md p-2 dark:bg-[#534e5741] dark:border-gray-800"
                        />
                    </div>
                ))}
                <IoAddCircleSharp
                    className="text-[#4A1F64] dark:text-[#c093dbb9] mt-6 cursor-pointer"
                    size={32}
                    onClick={handleAddPrerequisite}
                />
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={() => setActive(active - 1)}
                    className="bg-[#4A1F64] w-[25%] text-white px-4 py-2 rounded-md"
                >
                    Back
                </button>

                <button
                    onClick={() => {
                        if (
                            benefits[benefits.length - 1]?.title !== "" &&
                            prerequisites[prerequisites.length - 1]?.title !== ""
                        ) {
                            setActive(active + 1);
                        } else {
                            toast.error("Please fill all fields");
                        }
                    }}
                    className="bg-[#4A1F64] w-[25%] text-white px-4 py-2 rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CourseData;
