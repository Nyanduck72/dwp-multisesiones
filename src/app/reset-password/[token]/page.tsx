'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
}

export default function ResetPasswordPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const params = useParams();
  const token = Array.isArray(params.token) ? params.token[0] : params.token;
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          setError('Token inválido');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/auth/verify-token?token=${token}`);
        const data = await response.json();
        
        if (response.ok && data.valid) {
          setQuestions(data.questions);
          setAnswers(new Array(data.questions.length).fill(''));
        } else {
          setError('El enlace es inválido o ha expirado');
        }
      } catch (err) {
        setError('Error de conexión. Verifica tu internet.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (answers.some(answer => !answer.trim())) {
      setError('Debes responder todas las preguntas');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          answers,
          newPassword
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Contraseña actualizada correctamente');
        setTimeout(() => {
          router.push('/register');
        }, 2000);
      } else {
        setError(data.error || 'Ocurrió un error. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Verifica tu internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 text-center">
        <p className="text-gray-600">Verificando enlace...</p>
      </div>
    );
  }

  if (error && !questions.length) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-sm text-blue-600 hover:underline"
          >
            Solicitar nuevo enlace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Restablecer Contraseña</h1>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-800">Preguntas de Seguridad</h2>
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {q.question}
              </label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-800">Nueva Contraseña</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Procesando...' : 'Restablecer Contraseña'}
        </button>
      </form>
    </div>
  );
}
