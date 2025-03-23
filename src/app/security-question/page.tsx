import SecurityQuestions from '@/components/SecurityQuestions'
import React from 'react'
import { getSecurityQuestiosn } from '../endpoints'


export default async function SecurityQuestion(){
     const securityQuestions: any[] = await getSecurityQuestiosn()

    return(
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
            <div className='bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                    Establezca su pregunta de seguridad
                </h2>
                {securityQuestions.map(question => (
                    <div key={question.id_security_question}>
                        {question.security_question}
                    </div>
                ))}
                <SecurityQuestions idSecurityQuestion={securityQuestions[0].id_security_question}/>
            </div>
        </div>
    )
}