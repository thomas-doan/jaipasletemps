"use client"; // Indique que ce composant doit être rendu côté client

import { useState, useEffect } from 'react'; // Importer des outils pour gérer l'état et les effets
import { useRouter } from 'next/navigation'; // Importer un outil pour naviguer entre les pages

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Créer une variable pour savoir si l'utilisateur est connecté
  const router = useRouter(); // Créer un outil pour naviguer entre les pages

  useEffect(() => {
    const token = localStorage.getItem('token'); // Vérifie si un token est présent dans le stockage local
    if (token) {
      setIsAuthenticated(true); // Si un token est trouvé, l'utilisateur est connecté
    }
  }, []);

  const handleLogin = () => {
    router.push('/login'); // Redirige vers la page de connexion
  };

  const handleRegister = () => {
    router.push('/register'); // Redirige vers la page de création de compte
  };

  const handleDashboard = () => {
    router.push('/dashboard'); // Redirige vers la page de tableau de bord
  };

  const handleProfile = () => {
    router.push('/profile'); // Redirige vers la page de profil
  };

  return (
    <main>
      <style jsx>{`
        h1 {
          font-size: 4rem;
          color: #3668e6;
          text-align: center;
        }
        body {
          background: #3668e6;
        }
        header {
          display: flex;
          justify-content: flex-end;
          padding: 10px 20px;
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
        #Home {
          display: flex;
          justify-content: center;
        }
      `}</style>
      <header>
        {!isAuthenticated ? (
          <button onClick={handleLogin}>Connexion</button> // Afficher le bouton Connexion si l'utilisateur n'est pas connecté
        ) : (
          <button onClick={handleProfile}>Profil</button> // Afficher le bouton Profil si l'utilisateur est connecté
        )}
      </header>
      <h1>Quiz</h1>
      <div id="Home">
        {!isAuthenticated ? (
          <button onClick={handleRegister}>Créer un compte</button> // Afficher le bouton Créer un compte si l'utilisateur n'est pas connecté
        ) : (
          <button onClick={handleDashboard}>Accéder au tableau de bord</button> // Afficher le bouton Accéder au tableau de bord si l'utilisateur est connecté
        )}
      </div>
      <div></div>
    </main>
  );
}
