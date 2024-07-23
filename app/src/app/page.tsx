"use client"; // Indique que ce composant doit être rendu côté client

import { useState, useEffect } from 'react'; // Importer des outils pour gérer l'état et les effets
import { useRouter } from 'next/navigation'; // Importer un outil pour naviguer entre les pages
import { Header } from '../components/assets/Header'; // Assurez-vous que le chemin est correct
import { Button } from '../components/ui/button'; // Assurez-vous que le chemin est correct

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Créer une variable pour savoir si l'utilisateur est connecté
  const router = useRouter(); // Créer un outil pour naviguer entre les pages

  useEffect(() => {
    const token = localStorage.getItem('user'); // Vérifie si un utilisateur est présent dans le stockage local
    if (token) {
      setIsAuthenticated(true); // Si un utilisateur est trouvé, l'utilisateur est connecté
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

  const handleHome = () => {
    router.push('/login'); // Redirige vers la page de connexion
  };

  return (
    <main
      style={{
        backgroundColor: isAuthenticated ? '#008080' : '#ffffff', // Teal pour connecté, blanc pour non connecté
        minHeight: '100vh', // Assurez-vous que le fond couvre toute la hauteur de la page
        margin: 0, // Enlever la marge pour couvrir toute la largeur
      }}
    >
      {/* <Header /> Assurez-vous que ce composant est importé et utilisé ici */}
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
      `}</style>
      {/* <Header /> Si vous souhaitez afficher le Header */}
      
      <h1>Quiz</h1>
      <div id="Home">
        
        {!isAuthenticated ? (
          <>
            <button onClick={handleLogin}>Connexion</button>
            <button onClick={handleRegister}>Créer un compte</button>
          </>
        ) : (
          <button onClick={handleDashboard}>Accéder au tableau de bord</button>
        )}
      </div>
    </main>
  );
}
