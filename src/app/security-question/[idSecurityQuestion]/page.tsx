import { getSecurityQuestion, getSecurityQuestiosn } from '@/app/endpoints'
import SecurityQuestions from '@/components/SecurityQuestions'
import React from 'react'


export default async function SecurityQuestion({params,}:{params: Promise<{idSecurityQuestion: number}>}){
     const idSecurityQuestion = (await params).idSecurityQuestion
     const securityQuestions: any[] = await getSecurityQuestion(idSecurityQuestion)

    return(
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
            <div className='bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                    Establish Security Question
                </h2>
                {securityQuestions.map(question => (
                    <div className='font-italic text-white mb-3' key={question.id_security_question}>
                        {question.security_question}
                    </div>
                ))}
                <SecurityQuestions idSecurityQuestion={securityQuestions[0].id_security_question}/>
            </div>
        </div>
    )
}