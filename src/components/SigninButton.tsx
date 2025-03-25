"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-black py-2">{session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="cursor-pointer border-1 shadow-lg px-4 py-2 w-26 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#d40000] transition-all"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="cursor-pointer border-1 shadow-lg px-4 py-2 w-24 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#d40000] transition-all"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
