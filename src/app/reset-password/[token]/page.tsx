'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/auth/verify-token?token=${params.token}`);
        const data = await response.json();
        
        if (data.valid && data.questions) {
          setQuestions(data.questions);
          setLoading(false);
        } else {
          router.push('/auth/login?error=invalid_token');
        }
      } catch (error) {
        router.push('/auth/login?error=token_verification_failed');
      }
    };

    verifyToken();
  }, [params.token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: params.token,
        answers,
        newPassword
      }),
    });

    if (response.ok) {
      router.push('/auth/login?reset=success');
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Verificando seguridad...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Verificación de Seguridad</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <label className="block font-medium">{question}</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              required
            />
          </div>
        ))}
        <div className="space-y-2">
          <label className="block font-medium">Nueva Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
}
