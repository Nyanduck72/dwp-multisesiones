import React from 'react'
import { getSecurityQuestiosn } from '../endpoints'
import EditSecurityQuestion from '@/components/EditSecurityQuestion'

export default async function TestQuestion(){
    const securityQuestions: any[] = await getSecurityQuestiosn()
    
    return (
        <div>
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
                <div className='bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                        Preguntas de seguridad
                    </h2>
                    {securityQuestions.map(question => (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}} key={question.id_security_question}>
                            <h2>{question.security_question}</h2>
                            <EditSecurityQuestion idSecurityQuestion={question.id_security_question}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
