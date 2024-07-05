# jaipasletemps

Présentation du Projet
Start-Quizz est une application de quiz en réseau permettant à plusieurs joueurs de participer à des parties de quiz basées sur différents thèmes. Le projet utilise NestJS pour le backend et Prisma comme ORM pour interagir avec une base de données MySQL. L'application est conçue pour être modulaire, maintenable et scalable, en utilisant le pattern d'inversion de contrôle (IoC) pour gérer les dépendances.

Fonctionnalités
Gestion des Utilisateurs
Inscription : Les nouveaux utilisateurs peuvent s'inscrire en fournissant un email, un pseudo et un mot de passe.
Connexion : Les utilisateurs peuvent se connecter avec leur email et mot de passe.
JWT Authentification : Utilisation de JWT pour sécuriser les endpoints et gérer les sessions utilisateur.

Gestion des Thèmes et des Questions
Création de Thèmes : Les utilisateurs peuvent créer de nouveaux thèmes en fournissant un nom et une liste de 30 questions.
Récupération des Thèmes : Les utilisateurs peuvent récupérer la liste des thèmes disponibles.
Récupération des Questions : Les utilisateurs peuvent récupérer les questions associées à un thème donné.

Gestion des Quiz
Création de Quiz : Les utilisateurs peuvent créer un quiz en choisissant deux thèmes et en définissant le nombre maximal de joueurs.
Ajout de Joueurs : Les joueurs peuvent rejoindre un quiz existant.
Déroulement des Parties : Les parties se déroulent en trois phases de 10 questions chacune. Après chaque phase, la phase suivante est automatiquement activée.
Calcul des Scores : Les scores sont calculés en fonction des réponses correctes et du temps de réponse.
Affichage des Résultats Finaux : À la fin de la troisième phase, les scores finaux sont affichés.
Reconnexion des Joueurs Déconnectés : Les joueurs peuvent se reconnecter à un quiz en cours, avec synchronisation des questions et des scores.
Rejouer une Partie : Le créateur du quiz peut proposer de rejouer avec les mêmes joueurs, avec des questions différentes des parties précédentes.
Gestion des WebSockets

Communication Temps Réel : Utilisation de WebSockets pour gérer la communication en temps réel entre les joueurs et le serveur.
Gestion des Salons : Création, jointure et gestion des salons de quiz.

Architecture modulaire respectant la philosophie Nestjs.


