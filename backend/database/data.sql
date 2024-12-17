INSERT INTO users (fname, lname, address, NIC, email, password, contact_no, position)
VALUES 
('Kamal', 'Perera', 'No. 12, Galle Road, Colombo 03', '952345678V', 'kamal.admin@example.com', 'Adm!n@123', '0771234567', 'Admin'),
('Nadeeka', 'Kumari', '35, Station Road, Jaffna', '852345678V', 'nadeeka.librarian@example.com', 'Libr@r!an456', '0741239876', 'Librarian');

INSERT INTO authors (author_name, createdAt, updatedAt) 
VALUES 
('Chandana Wickramasinghe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Amal Perera', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Kanchana Jayasinghe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sithara Fernando', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Priyanka Herath', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sunethra Rajakaruna', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Nuwan Ekanayake', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mahinda Abeywardena', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sanduni Wijesinghe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dilanka Rathnayake', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO books (book_name, ISBN, author_id, quantity, available_qty, isActive, createdAt, updatedAt) 
VALUES 
('Golu Muhude Kunatuwa', '978-955-30-1234-5', 1, 50, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Amuthu Leda', '978-955-30-5678-9', 2, 30, 28, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sanda Eliyata Pem Benda', '978-955-20-2345-6', 3, 40, 40, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Deweni Inima', '978-955-10-6789-0', 4, 60, 59, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sithuwili Pethuma', '978-955-40-3456-7', 5, 20, 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ape Game Kathandara', '978-955-50-7890-1', 6, 35, 33, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pahan Tharuwa', '978-955-60-1234-8', 7, 25, 24, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Senasuru Maruwa', '978-955-70-5678-2', 8, 45, 45, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Kalu Diya Dahara', '978-955-80-2345-9', 9, 55, 54, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pem Kekula', '978-955-90-6789-3', 10, 15, 15, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO borrowers (fname, lname, address, NIC, email, contact_no, isActive, createdAt, updatedAt) 
VALUES 
('Kamal', 'Perera', 'No. 23, Galle Road, Colombo 03', '123456789V', 'kamal.perera@gmail.com', '0771234567', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Nimal', 'Fernando', 'No. 45, Kandy Road, Gampaha', '987654321V', 'nimal.fernando@yahoo.com', '0719876543', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sunethra', 'Wijesinghe', 'No. 12, Lake View, Nuwara Eliya', '456789123V', 'sunethra.w@gmail.com', '0774567891', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Amali', 'Jayawardena', 'No. 89, Flower Road, Matara', '789123456V', 'amali.j@outlook.com', '0767891234', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Saman', 'Ekanayake', 'No. 65, Temple Road, Kurunegala', '321654987V', 'saman.ek@gmail.com', '0783216549', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tharanga', 'Herath', 'No. 8, Circular Road, Anuradhapura', '159753258V', 'tharanga.herath@hotmail.com', '0751597532', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lakmal', 'Abeywickrama', 'No. 22, Coconut Estate, Polonnaruwa', '951357456V', 'lakmal.abey@gmail.com', '0779513574', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Chathuri', 'Dissanayake', 'No. 77, Queens Street, Jaffna', '357951654V', 'chathuri.d@gmail.com', '0743579516', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hiran', 'Silva', 'No. 101, Hill Top, Bandarawela', '753159852V', 'hiran.silva@ymail.com', '0787531598', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Anjali', 'Karunaratne', 'No. 49, River Bank, Badulla', '258456753V', 'anjali.k@gmail.com', '0722584567', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


