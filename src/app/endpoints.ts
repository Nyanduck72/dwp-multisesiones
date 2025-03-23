import { FormData } from "@/components/registerForm";
import { FormQuestionUser } from "@/components/SecurityQuestions";

const url: string = "http://localhost:3000";

export const register = async (formData: FormData) => {
  const response = await fetch(`${url}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  return response.json();
};

export const getSecurityQuestion = async (idSecurityQuestion: number) => {
  const response = await fetch(`${url}/api/securityQuestions/${idSecurityQuestion}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })

  return response.json()
}

export const getSecurityQuestiosn = async () => {
  const response = await fetch(`${url}/api/securityQuestions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })

  return response.json()
}

export const setSecurityQuestion = async (formData: FormQuestionUser) => {
  const response = await fetch(`${url}/api/securityQuestions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idSecurityQuestion: formData.idSecurityQuestion,
      userEmail: formData.sessionEmail,
      questionAnswer: formData.questionAnswer,
    }),
  });

  return response.json();
};
