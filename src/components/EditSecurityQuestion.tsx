"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EditSecurityQuestion(props: {idSecurityQuestion: number}){
    const router = useRouter();
    return (    
        <div>
            {/* <button style={{background: 'gray', borderRadius: '10px', color: 'white', padding: '5px'}}>Edit</button> */}
            <button 
                onClick={() => router.push(`/security-question/${props.idSecurityQuestion}`)}
                className='cursor-pointer border-1 shadow-lg px-2 py-2 w-18 rounded-lg text-blue-600 ml-auto hover:text-white hover:bg-white-600 hover:text-black-600 hover:border-black-600 transition-all'>
                Edit
            </button>
        </div>
    )
}