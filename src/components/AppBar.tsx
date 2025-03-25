import Link from "next/link";
import React from "react";
import SigninButton from "./SigninButton";
import SessionNav from "./SessionNav";

const AppBar = () => {
  return (
<header className="bg-[#d40000] shadow-lg border-b-4 border-[#9a0000]">
  <div className="container mx-auto px-6 py-3 flex justify-between items-center">
    {/* Logo with animated burger */}
    <Link href="/" className="flex items-center group">
      <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
        <span className="text-2xl">
        <img 
          src="./elpoderosisimoiatengohambre.png" 
          alt="Burger Icon"
          className="w-8 h-8 object-contain"         
        />
        </span>
      </div>
      <span className="text-2xl font-bold text-white font-sans tracking-wider">
        CARL'S<span className="text-yellow-400"> JUNIOR</span>
      </span>
    </Link>
    <SessionNav />
    <SigninButton />

  </div>
</header>
  );
};

export default AppBar;
