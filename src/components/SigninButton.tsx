"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600 py-2">{session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="cursor-pointer border-1 shadow-lg px-4 py-2 w-26 rounded-lg text-red-600 ml-auto hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="cursor-pointer border-1 shadow-lg px-4 py-2 w-24 rounded-lg text-green-600 ml-auto hover:text-white hover:bg-green-600 hover:border-green-600 transition-all"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
