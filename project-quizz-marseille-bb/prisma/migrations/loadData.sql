INSERT INTO User (id, email, password, firstname, lastname, role, createdAt, updatedAt) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'test1@gmail.com', 'hashedpassword1', 'test1', 'tati', 'USER', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440001', 'test2@gmail.com', 'hashedpassword2', 'test2', 'tata', 'USER', NOW(), NOW());

INSERT INTO Player (id, name, elo, userId) VALUES
                                               ('660e8400-e29b-41d4-a716-446655440000', 'Player1', 1000, '550e8400-e29b-41d4-a716-446655440000'),
                                               ('660e8400-e29b-41d4-a716-446655440001', 'Player2', 1000, '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO Quiz (id, name, description, difficulty, maxPlayers, ownerId, createdAt, updatedAt) VALUES
    ('770e8400-e29b-41d4-a716-446655440000', 'Quiz premier test', 'c'est la folieeee, 'MEDIUM', 5, '660e8400-e29b-41d4-a716-446655440000', NOW(), NOW());

INSERT INTO Question (id, text, correctAnswer, themeId) VALUES
                                                            ('880e8400-e29b-41d4-a716-446655440000', 'What is the capital of France?', 'Paris', NULL),
                                                            ('880e8400-e29b-41d4-a716-446655440001', 'What is 2 + 2?', '4', NULL);

INSERT INTO QuizQuestion (quizId, questionId) VALUES
                                              ('770e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000'),
                                              ('770e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440001');

INSERT INTO Answer (id, text, questionId) VALUES
                                              ('990e8400-e29b-41d4-a716-446655440000', 'Paris', '880e8400-e29b-41d4-a716-446655440000'),
                                              ('990e8400-e29b-41d4-a716-446655440001', 'London', '880e8400-e29b-41d4-a716-446655440000'),
                                              ('990e8400-e29b-41d4-a716-446655440002', 'Berlin', '880e8400-e29b-41d4-a716-446655440000'),
                                              ('990e8400-e29b-41d4-a716-446655440003', 'Madrid', '880e8400-e29b-41d4-a716-446655440000'),
                                              ('990e8400-e29b-41d4-a716-446655440004', '3', '880e8400-e29b-41d4-a716-446655440001'),
                                              ('990e8400-e29b-41d4-a716-446655440005', '4', '880e8400-e29b-41d4-a716-446655440001'),
                                              ('990e8400-e29b-41d4-a716-446655440006', '5', '880e8400-e29b-41d4-a716-446655440001'),
                                              ('990e8400-e29b-41d4-a716-446655440007', '6', '880e8400-e29b-41d4-a716-446655440001');


INSERT INTO Theme (id, name, description) VALUES
                                              ('bb0e8400-e29b-41d4-a716-446655440000', 'Geography', 'Questions about geography'),
                                              ('bb0e8400-e29b-41d4-a716-446655440001', 'Mathematics', 'Questions about mathematics');


UPDATE Question SET themeId = 'bb0e8400-e29b-41d4-a716-446655440000' WHERE id = '880e8400-e29b-41d4-a716-446655440000';
UPDATE Question SET themeId = 'bb0e8400-e29b-41d4-a716-446655440001' WHERE id = 'bb0e8400-e29b-41d4-a716-446655440001';


/* QUIZ 2 */

-- Insert Theme
INSERT INTO `Theme` (id, name, description)
VALUES (UUID(), 'Marseille', 'Ville de Marseille');

-- Insert Quiz
INSERT INTO `Quiz` (id, name, description, difficulty, maxPlayers, createdAt, updatedAt)
VALUES (UUID(), 'Quiz Marseille', 'Testez vos connaissances sur Marseille', 'EASY', 4, NOW(), NOW());

-- Link Theme to Quiz
INSERT INTO `ThemeQuiz` (themeId, quizId)
VALUES ((SELECT id FROM `Theme` WHERE name = 'Marseille'), (SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'));

-- Question 1
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?', 'Marseille', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Lyon', (SELECT id FROM `Question` WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?')),
       (UUID(), 'Marseille', (SELECT id FROM `Question` WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?')),
       (UUID(), 'Nice', (SELECT id FROM `Question` WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?')),
       (UUID(), 'Toulon', (SELECT id FROM `Question` WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?'));

-- Question 2
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom de la basilique la plus célèbre de Marseille ?', 'Notre-Dame-de-la-Garde', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Saint-Laurent', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?')),
       (UUID(), 'La Major', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?')),
       (UUID(), 'Le Vieux-Port', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?')),
       (UUID(), 'Notre-Dame-de-la-Garde', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?'));

-- Question 3
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom de l''équipe de football de Marseille ?', 'Olympique de Marseille', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Olympique de Marseille', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?')),
       (UUID(), 'Paris Saint-Germain', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?')),
       (UUID(), 'Olympique Lyonnais', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?')),
       (UUID(), 'AS Monaco', (SELECT id FROM `Question` WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?'));

-- Question 4
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom du plat typique de Marseille ?', 'Bouillabaisse', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Ratatouille', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du plat typique de Marseille ?')),
       (UUID(), 'Bouillabaisse', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du plat typique de Marseille ?')),
       (UUID(), 'Soupe à l''oignon', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du plat typique de Marseille ?')),
       (UUID(), 'Couscous', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du plat typique de Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom du plat typique de Marseille ?'));

-- Question 5
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom du quartier historique de Marseille ?', 'Le Panier', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'La Canebière', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du quartier historique de Marseille ?')),
       (UUID(), 'Le Panier', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du quartier historique de Marseille ?')),
       (UUID(), 'Castellane', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du quartier historique de Marseille ?')),
       (UUID(), 'La Joliette', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du quartier historique de Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom du quartier historique de Marseille ?'));

-- Question 6
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom du célèbre savon de Marseille ?', 'Savon de Marseille', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Savon d''Alep', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre savon de Marseille ?')),
       (UUID(), 'Savon du Midi', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre savon de Marseille ?')),
       (UUID(), 'Savon de La Savonnerie du Midi', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre savon de Marseille ?')),
       (UUID(), 'Savon de Marseille', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre savon de Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre savon de Marseille ?'));

-- Question 7
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom du célèbre écrivain né à Marseille ?', 'Jean-Paul Sartre', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Albert Camus', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?')),
       (UUID(), 'Jean-Paul Sartre', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?')),
       (UUID(), 'Alexandre Dumas', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?')),
       (UUID(), 'Marcel Pagnol', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?'));

-- Question 8
INSERT INTO `Question` (id, text, correctAnswer, themeId)
VALUES (UUID(), 'Quel est le nom du Musée des Beaux-Arts de Marseille ?', 'Musée des Beaux-Arts de Marseille', (SELECT id FROM `Theme` WHERE name = 'Marseille'));

INSERT INTO `Answer` (id, text, questionId)
VALUES (UUID(), 'Musée des Beaux-Arts de Marseille', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?')),
       (UUID(), 'Musée de la Vieille Charité', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?')),
       (UUID(), 'Musée des Civilisations de l''Europe et de la Méditerranée', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?')),
       (UUID(), 'Musée Cantini', (SELECT id FROM `Question` WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?'));

INSERT INTO `QuizQuestion` (quizId, questionId)
VALUES ((SELECT id FROM `Quiz` WHERE name = 'Quiz Marseille'), (SELECT id FROM `Question` WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?'));
