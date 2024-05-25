CREATE TABLE planes (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    color VARCHAR(20),
    speed VARCHAR(20)
);

CREATE TABLE plane_paths (
    plane_id VARCHAR(50),
    lat FLOAT,
    lng FLOAT,
    FOREIGN KEY (plane_id) REFERENCES planes(id)
);


-- Insertion des données des avions
INSERT INTO planes (id, name, color, speed) VALUES
('planeA', 'Plane A', '#21253d', '400km/h'),
('planeB', 'Plane B', '#458ac8', '350km/h'),
('planeC', 'Plane C', '#f2cc73', '300km/h');

-- Insertion des données de trajectoire des avions (Plane A)
INSERT INTO plane_paths (plane_id, lat, lng) VALUES
('planeA', 36.7538, 3.0588),
('planeA', 36.7372, 3.0877),
('planeA', 36.7194, 3.1164),
('planeA', 36.7070, 3.1375),
('planeA', 36.6888, 3.1615),
('planeA', 36.6792, 3.1793),
('planeA', 36.6717, 3.2002),
('planeA', 36.6566, 3.2202),
('planeA', 36.6480, 3.2389),
('planeA', 36.6429, 3.2572),
('planeA', 36.6325, 3.2739),
('planeA', 36.6245, 3.2906),
('planeA', 36.6156, 3.3053),
('planeA', 36.6053, 3.3192),
('planeA', 36.5952, 3.3326),
('planeA', 36.5853, 3.3452),
('planeA', 36.5745, 3.3573),
('planeA', 36.5628, 3.3690),
('planeA', 36.5520, 3.3803),
('planeA', 36.5413, 3.3911);

-- Insertion des données de trajectoire des avions (Plane B)
INSERT INTO plane_paths (plane_id, lat, lng) VALUES
('planeB', 36.7128, 3.0875),
('planeB', 36.7236, 3.1011),
('planeB', 36.7351, 3.1147),
('planeB', 36.7474, 3.1283),
('planeB', 36.7604, 3.1422),
('planeB', 36.7740, 3.1541),
('planeB', 36.7852, 3.1663),
('planeB', 36.7948, 3.1783),
('planeB', 36.8046, 3.1920),
('planeB', 36.8137, 3.2046),
('planeB', 36.8241, 3.2182),
('planeB', 36.8347, 3.2316),
('planeB', 36.8455, 3.2451),
('planeB', 36.8564, 3.2591),
('planeB', 36.8674, 3.2733),
('planeB', 36.8786, 3.2879),
('planeB', 36.8899, 3.3028),
('planeB', 36.9013, 3.3179),
('planeB', 36.9129, 3.3334),
('planeB', 36.9245, 3.3492);

-- Insertion des données de trajectoire des avions (Plane C)
INSERT INTO plane_paths (plane_id, lat, lng) VALUES
('planeC', 36.7610, 3.0588),
('planeC', 36.7435, 3.0877),
('planeC', 36.7261, 3.1164),
('planeC', 36.7088, 3.1375),
('planeC', 36.6916, 3.1615),
('planeC', 36.6745, 3.1793),
('planeC', 36.6575, 3.2002),
('planeC', 36.6406, 3.2202),
('planeC', 36.6238, 3.2389),
('planeC', 36.6071, 3.2572),
('planeC', 36.5905, 3.2774),
('planeC', 36.5741, 3.2955),
('planeC', 36.5578, 3.3140),
('planeC', 36.5417, 3.3328),
('planeC', 36.5257, 3.3520),
('planeC', 36.5099, 3.3715),
('planeC', 36.4943, 3.3913),
('planeC', 36.4788, 3.4114),
('planeC', 36.4636, 3.4318),
('planeC', 36.4485, 3.4525);
