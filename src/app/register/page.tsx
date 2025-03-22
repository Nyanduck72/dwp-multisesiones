import RegisterForm from "../../components/registerForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
