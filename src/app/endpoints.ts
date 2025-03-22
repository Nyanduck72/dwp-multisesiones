import { FormData } from "@/components/registerForm";

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
