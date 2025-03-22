'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef<number>(300); // 5 minutes in seconds
  const [displayTime, setDisplayTime] = useState<string>('5:00');

  // Function to handle user activity
  const resetInactivityTimer = () => {
    // Clear the existing timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Reset the time left to 5 minutes
    timeLeftRef.current = 300;
    setDisplayTime('5:00');
    setShowWarning(false);

    // Set a new timeout for 5 minutes (300,000 milliseconds)
    timeoutIdRef.current = setTimeout(() => {
      signOut({ redirect: false }).then(() => {
        router.push('/register'); // Redirect to the register page after sign-out
      });
    }, 300000); // 5 minutes in milliseconds
  };

  // Effect to update the countdown every second
  useEffect(() => {
    if (session) {
      const countdownInterval = setInterval(() => {
        timeLeftRef.current -= 1;

        // Update the display time every second
        const minutes = Math.floor(timeLeftRef.current / 60);
        const seconds = timeLeftRef.current % 60;
        setDisplayTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        // Show a warning when 1 minute is left
        if (timeLeftRef.current === 60) {
          setShowWarning(true);
        }
      }, 1000);

      // Cleanup interval on component unmount or session change
      return () => clearInterval(countdownInterval);
    }
  }, [session]);

  // Effect to set up event listeners for user activity
  useEffect(() => {
    if (session) {
      // Add event listeners for user activity
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);
      window.addEventListener('click', resetInactivityTimer);

      // Initialize the inactivity timer
      resetInactivityTimer();

      // Cleanup event listeners and timeout on component unmount
      return () => {
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keydown', resetInactivityTimer);
        window.removeEventListener('click', resetInactivityTimer);
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      };
    }
  }, [session]);

  // Redirect to /register if the user is not signed in
  useEffect(() => {
    if (!session) {
      router.push('/register');
    }
  }, [session, router]);

  if (session && session.user) {
    return (
      <div className="w-screen h-screen bg-radial-gradient from-neutral-400 to-neutral-500 flex items-center justify-center flex-col">
        <h1 className="text-6xl font-bold">Logged In</h1>
        <p className="mt-4 text-lg text-gray-300">
          Time left before sign-out: {displayTime}
        </p>
        {showWarning && (
          <div className="mt-6 p-4 bg-yellow-500 text-white rounded-lg">
            <p>You will be signed out in 1 minute due to inactivity.</p>
            <button
              onClick={resetInactivityTimer}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Stay Signed In
            </button>
          </div>
        )}
      </div>
    );
  }

  // Return null or a loading spinner while redirecting
  return null;
}