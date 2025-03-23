import prisma from "@/lib/prisma";
import { SecurityQuestions } from "@prisma/client";
import { NextResponse } from "next/server";

interface RequestBody {
    idSecurityQuestion: number,
    questionAnswer: string;
    userEmail: string;
  }

//   export async function GET({params}: {params: Promise<{slug: number}>}){
//     const {slug} = await params
//     const securityQuestions: SecurityQuestions[] = await prisma.securityQuestions.findMany({where: {id_security_question: slug}})
//     return new Response(JSON.stringify(securityQuestions))
// }

export async function GET(){
    const securityQuestions: SecurityQuestions[] = await prisma.securityQuestions.findMany()
    return new Response(JSON.stringify(securityQuestions))
}

export async function POST(request: Request){
    try {
        const { idSecurityQuestion, userEmail, questionAnswer } = await request.json();
        const user = await prisma.user.findFirst({
            where: {
                email: userEmail
            }
        })
        if(user){
            const existingQuestionUser = await prisma.questionsUser.findFirst({
                where: {
                    id_security_question: idSecurityQuestion
                }
            })
            if( !existingQuestionUser ){
                const questionUser = await prisma.questionsUser.create({
                    data: {
                        id_security_question: idSecurityQuestion,
                        id_user: user.id,
                        answer: questionAnswer
                    }
                })
                return NextResponse.json({ message: "Security question configured succesfully"}) 
            }
            else {
                const questionUser = await prisma.questionsUser.update({
                    where: {
                        id_security_user: existingQuestionUser.id_security_user
                    },
                    data: {
                        answer: questionAnswer
                    }
                })
                return NextResponse.json({ message: "Security question updated succesfully"}) 
            }

        }
        return NextResponse.json({ message: "Couldnt find user"}) 
    } catch (error) {
           return NextResponse.json({ message: "Something unexpected ocurred"}) 
    }
}