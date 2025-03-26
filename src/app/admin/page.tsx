'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Users from "@/components/Users";

export default function Admin() {

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as { role: number };

  if(!user){
    return router.push('/register')
  }

  if (user.role !== 2)
    return (
      <div style={{margin: '15px 20% 15px 20%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        <h1 className="text-3xl font-bold text-[#d40000] font-['Bebas_Neue'] tracking-wide">YOU DO NOT HAVE  <span className="text-yellow-500">PERMISION</span> TO ACCESS THIS PAGE.</h1>
    </div>
    );

  return (
    <Users />
  )
}
