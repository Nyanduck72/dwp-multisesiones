"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export default function SessionNav(){
    const { data: session } = useSession();
    
    if(session && session.user){
        return (
            <Link 
                className="cursor-pointer px-6 py-2 w-54 rounded-lg text-black transition-colors" 
                href={"/security-question"}
            >
                Set Security Questions
            </Link>
        )
    }
    else{
        return(
            <Link 
                className="cursor-pointer w-54 rounded-lg text-black transition-colors"
                href={"/forgot-password"}
            >
                Forgot Password?
            </Link>
        )
    }
}
