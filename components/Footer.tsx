import React from "react";

const Footer = () => {
  return (
    <div className="grid grid-cols-12 space-x-4 justify-items-start">
      <div className="col-span-4">
        <h1 className="text-lg text-[var(--darker)] dark:text-[var(--white)] font-bold">
          Company
        </h1>
        <ul className="space-y-1 text-[var(--darkpurple)] dark:text-slate-200">
          <li>About Us</li>
          <li>Press</li>
          <li>FAQ</li>
        </ul>
      </div>

      <div className="col-span-4">
        <h1 className="text-lg text-[var(--darker)] dark:text-[var(--white)] font-bold">
          Quick Links
        </h1>
        <ul className="space-y-1 text-[var(--darkpurple)] dark:text-slate-200">
          <li>Courses</li>
          <li>My Account</li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div className="col-span-4">
        <h1 className="text-lg text-[var(--darker)] dark:text-[var(--white)] font-bold">
          Social Links
        </h1>
        <ul className="space-y-1 text-[var(--darkpurple)] dark:text-slate-200">
          <li>Facebook</li>
          <li>Linkedin</li>
          <li>Github</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
