import Link from "next/link";
import React from "react";
import SigninButton from "./SigninButton";
import SessionNav from "./SessionNav";

const AppBar = () => {
  return (
    <header className="flex align-center gap-4 p-4 bg-gradient-to-b from-white to-gray-400 shadow-lg">
      <Link className="cursor-pointer px-4 py-2 w-32 rounded-lg text-black hover:text-blue-600 transition-colors" href={"/"}>
        Home Page
      </Link>
      <SessionNav />
      {/* <Link className="transition-colors hover:text-blue-500" href={"/user"}>
        User Post Page
      </Link> */}
      <SigninButton />
    </header>
  );
};

export default AppBar;
