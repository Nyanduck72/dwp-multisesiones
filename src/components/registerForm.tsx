"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { register } from "@/app/endpoints";
import { useRouter } from "next/navigation";

// Define the type for the form data
export type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {

  const router = useRouter();

  // Initialize state with the FormData type
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  // Define the type for the handleChange event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define the type for the handleSubmit event
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData)
      .then((res) => {
        alert(res.message);
      })
      .catch((error) => alert(error.message));
    console.log("Form Data:", formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border-4 border-[#9a0000]">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[#d40000] font-['Bebas_Neue'] tracking-wide">
          JOIN OUR <span className="text-yellow-500">CLUB</span>
        </h2>
        <p className="text-gray-600 mt-2">Get exclusive deals and rewards!</p>
      </div>
  
      {/* Username Field */}
      <div className="space-y-2">
        <label htmlFor="username" className="block text-lg font-bold text-[#d40000]">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium"
          placeholder="Create your username"
          required
        />
      </div>
  
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-lg font-bold text-[#d40000]">
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium"
          placeholder="your@email.com"
          required
        />
      </div>
  
      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-lg font-bold text-[#d40000]">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#d40000] focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium"
          placeholder="••••••••"
          required
        />
      </div>
  
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-6 bg-[#d40000] hover:bg-[#b30000] text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        SIGN UP NOW
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  </div>
  );
}
