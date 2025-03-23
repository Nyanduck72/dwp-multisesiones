"use client"

import { getSecurityQuestiosn, setSecurityQuestion } from "@/app/endpoints"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"

export type FormQuestionUser = {
  idSecurityQuestion: number,
  sessionEmail: string,
  questionAnswer: string
}

export default function SecurityQuestions(props: {idSecurityQuestion: number}) {

  const router = useRouter();
  const { data: session } = useSession();
  const [securityQuestionAnswer,setAnswer] = useState<string>("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setAnswer(
        value
      );
    };

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormQuestionUser = {
          idSecurityQuestion: props.idSecurityQuestion,
          questionAnswer: securityQuestionAnswer,
          sessionEmail: session?.user?.email!
        }
        setSecurityQuestion(formData)
          .then((res) => {
            alert(res.message);
            router.push("/")
          })
          .catch((error) => alert(error.message));
        console.log("Form Data:", formData);
      };

    return (
      <div className="">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
              Respuesta
            </label>
            <input
                type="text"
                id="question"
                name="question"
                value={securityQuestionAnswer}
                className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
                style={{margin: '10px 0 10px 0'}}
                >
            </input>
            <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            Configurar pregunta de seguridad
          </button>
          </div>
        </form>
      </div>
    )
}

