// app/page.tsx (ou pages/index.tsx)

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/assets/Header'; // Assurez-vous que le chemin est correct
import { Button } from '../components/ui/button';


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setIsAuthenticated(true);
      router.push('/games'); // Redirige vers la page de jeux si l'utilisateur est connecté
    }
  }, [router]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <main
      style={{
        backgroundColor: isAuthenticated ? '#008080' : '#ffffff',
        minHeight: '100vh',
        margin: 0,
      }}
    >
      {/* <Header isAuthenticated={isAuthenticated} /> */}
      <style jsx>{`
        h1 {
          font-size: 4rem;
          color: #3668e6;
          text-align: center;
        }
        #Home {
          display: flex;
          justify-content: center;
        }
        button {
          background: #3668e6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 10px;
          cursor: pointer;
        }
        button:hover {
          background: #3f83f8;
        }

        form {
              border: 1px solid black;
              padding: 20px;
              background-color: #f9f9f9;
              }
      `}</style>
      <h1>Quiz</h1>
      <div id="Home">
        {!isAuthenticated ? (
          <>
            <button onClick={handleLogin}>Connexion</button>
            <button onClick={handleRegister}>Inscription</button>
          </>
        ) : (
          <button onClick={() => router.push('/dashboard')}>Accéder au tableau de bord</button>
        )}
      </div>
    </main>
  );
}
