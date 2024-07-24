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

INSERT INTO "Theme" (id, name, description)
VALUES (uuid_generate_v4(), 'Marseille', 'Ville de Marseille');

INSERT INTO "Quiz" (id, name, description, difficulty, maxPlayers)
VALUES (uuid_generate_v4(), 'Quiz Marseille', 'Testez vos connaissances sur Marseille', 'EASY', 4);

INSERT INTO "ThemeQuiz" (themeId, quizId)
VALUES ((SELECT id FROM "Theme" WHERE name = 'Marseille'), (SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'));

-- Theme Marseille (déjà inséré)
-- Quiz Marseille (déjà inséré)

-- Question 1
INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?', 'Marseille', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Lyon', (SELECT id FROM "Question" WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?')),
    (uuid_generate_v4(), 'Marseille', (SELECT id FROM "Question" WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?')),
    (uuid_generate_v4(), 'Nice', (SELECT id FROM "Question" WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?')),
    (uuid_generate_v4(), 'Toulon', (SELECT id FROM "Question" WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quelle est la plus grande ville de la région Provence-Alpes-Côte d''Azur ?'));

INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom de la basilique la plus célèbre de Marseille ?', 'Notre-Dame-de-la-Garde', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Saint-Laurent', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?')),
       (uuid_generate_v4(), 'La Major', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?')),
       (uuid_generate_v4(), 'Le Vieux-Port', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?')),
       (uuid_generate_v4(), 'Les Calanques', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom de la basilique la plus célèbre de Marseille ?'));

INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom de l''équipe de football de Marseille ?', 'Olympique de Marseille', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'AS Saint-Étienne', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?')),
    (uuid_generate_v4(), 'Paris Saint-Germain', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?')),
    (uuid_generate_v4(), 'Olympique Lyonnais', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?')),
    (uuid_generate_v4(), 'AS Monaco', (SELECT id FROM "Question" WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom de l''équipe de football de Marseille ?'));

-- Question 4
INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom du plat typique de Marseille ?', 'Bouillabaisse', (SELECT id FROM "Theme" WHERE name = 'Marseille'));
INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Ratatouille', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du plat typique de Marseille ?')),
    (uuid_generate_v4(), 'Salade niçoise', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du plat typique de Marseille ?')),
    (uuid_generate_v4(), 'Soupe à l''oignon', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du plat typique de Marseille ?')),
    (uuid_generate_v4(), 'Couscous', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du plat typique de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom du plat typique de Marseille ?'));

-- Question 5

INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom du quartier historique de Marseille ?', 'Le Panier', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'La Canebière', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du quartier historique de Marseille ?')),
    (uuid_generate_v4(), 'Saint-Charles', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du quartier historique de Marseille ?')),
    (uuid_generate_v4(), 'Castellane', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du quartier historique de Marseille ?')),
    (uuid_generate_v4(), 'La Joliette', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du quartier historique de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom du quartier historique de Marseille ?'));

-- Question 6

INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom du célèbre savon de Marseille ?', 'Savon de Marseille', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Savon d''Alep', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre savon de Marseille ?')),
    (uuid_generate_v4(), 'Savon du Midi', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre savon de Marseille ?')),
    (uuid_generate_v4(), 'Savon de La Savonnerie du Midi', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre savon de Marseille ?')),
    (uuid_generate_v4(), 'Savon de Laguiole', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre savon de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre savon de Marseille ?'));

-- Question 7

INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom du célèbre écrivain né à Marseille ?', 'Jean-Paul Sartre', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Albert Camus', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?')),
       (uuid_generate_v4(), 'Victor Hugo', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?')),
       (uuid_generate_v4(), 'Alexandre Dumas', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?')),
       (uuid_generate_v4(), 'Marcel Pagnol', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom du célèbre écrivain né à Marseille ?'));

-- Question 8
INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom du Musée des Beaux-Arts de Marseille ?', 'Musée des Beaux-Arts de Marseille', (SELECT id FROM "Theme" WHERE name = 'Marseille'));
INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Musée Picasso', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?')),
    (uuid_generate_v4(), 'Musée d''Orsay', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?')),
    (uuid_generate_v4(), 'Centre Pompidou', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?')),
    (uuid_generate_v4(), 'Musée Rodin', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom du Musée des Beaux-Arts de Marseille ?'));

-- Question 9
INSERT INTO "Question" (id, text, correctAnswer, themeId)
VALUES (uuid_generate_v4(), 'Quel est le nom du stade de football de l''Olympique de Marseille ?', 'Orange Vélodrome', (SELECT id FROM "Theme" WHERE name = 'Marseille'));

INSERT INTO "Answer" (id, text, questionId)
VALUES (uuid_generate_v4(), 'Stade de France', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du stade de football de l''Olympique de Marseille ?')),
    (uuid_generate_v4(), 'Parc des Princes', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du stade de football de l''Olympique de Marseille ?')),
    (uuid_generate_v4(), 'Groupama Stadium', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du stade de football de l''Olympique de Marseille ?')),
    (uuid_generate_v4(), 'Stade Geoffroy-Guichard', (SELECT id FROM "Question" WHERE text = 'Quel est le nom du stade de football de l''Olympique de Marseille ?'));

INSERT INTO "QuizQuestion" (quizId, questionId)
VALUES ((SELECT id FROM "Quiz" WHERE name = 'Quiz Marseille'), (SELECT id FROM "Question" WHERE text = 'Quel est le nom du stade de football de l''Olympique de Marseille ?'));


