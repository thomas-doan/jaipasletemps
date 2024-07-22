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
