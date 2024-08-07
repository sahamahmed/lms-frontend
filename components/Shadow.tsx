import React from "react";

const Shadow = () => {
  return (
    <div className="w-full">
      <img
        src="/bg shadow.png"
        className="absolute w-[800px] right-[-5%] top-[-5%] blur-2xl"
      />

      <img
        src="/bg shadow.png"
        className="absolute w-full right-[10%] top-[30%] h-[450px] blur-2xl"
      />
      <img
        src="/bg shadow.png"
        className="absolute w-full right-[10%] top-[42%] h-[450px] blur-2xl"
      />
      <img
        src="/bg shadow.png"
        className="absolute w-full left-[-10%] top-[62%] h-[350px] blur-2xl"
      />

      <img
        src="/bg shadow.png"
        className="absolute  w-full left-[-80%] top-[76%]  h-[350px] blur-2xl"
      />
      <img
        src="/bg shadow.png"
        className="absolute w-full right-[-90%] top-[80%] h-[450px] blur-2xl"
      />
    </div>
  );
};

export default Shadow;
