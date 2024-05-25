CREATE TABLE flights (
    flight_id INT AUTO_INCREMENT PRIMARY KEY,
    num_flight INT NOT NULL,
    plane VARCHAR(100) NOT NULL,
    departure_location VARCHAR(100) NOT NULL,
    destination_location VARCHAR(100) NOT NULL,
    hour_launching DATETIME NOT NULL,
    hour_arrival DATETIME NOT NULL
);


INSERT INTO flights (num_flight, plane, departure_location, destination_location, hour_launching, hour_arrival)
VALUES
(1, 'Airbus A320', 'Alger', 'Paris', '2024-05-24 08:00:00', '2024-05-24 11:00:00'),
(2, 'Boeing 737', 'Alger', 'London', '2024-05-24 09:00:00', '2024-05-24 12:30:00'),
(3, 'Airbus A330', 'Alger', 'New York', '2024-05-24 10:00:00', '2024-05-24 16:00:00'),
(4, 'Boeing 747', 'Alger', 'Madrid', '2024-05-24 11:00:00', '2024-05-24 14:00:00'),
(5, 'Airbus A350', 'Alger', 'Berlin', '2024-05-24 12:00:00', '2024-05-24 15:30:00'),
(6, 'Boeing 787', 'Alger', 'Rome', '2024-05-24 13:00:00', '2024-05-24 16:45:00');

