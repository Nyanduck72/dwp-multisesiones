import React, { useEffect } from 'react'
import { getSecurityQuestiosn } from '../endpoints'
import EditSecurityQuestion from '@/components/EditSecurityQuestion'

export default async function TestQuestion(){
      
    const securityQuestions: any[] = await getSecurityQuestiosn()
    
    if(securityQuestions.length == 0){
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
                <div className='bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                        No Security Questions Found
                    </h2>
                    <h3 className='text-2xl font-bold text-white mb-3 text-center'>
                        Please ask an administrator
                    </h3>
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
                    <div className='bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                            Security Questions
                        </h2>
                        {securityQuestions.map(question => (
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '5px', margin: '5px 0 5px 0', borderRadius: '5px', background: '#3d3d3d'}} key={question.id_security_question}>
                                <h2>{question.security_question}</h2>
                                <EditSecurityQuestion idSecurityQuestion={question.id_security_question}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
