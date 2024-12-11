-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 11, 2024 בזמן 09:18 AM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedom`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `followers`
--

INSERT INTO `followers` (`user_id`, `vacation_id`) VALUES
(2, 2),
(2, 3),
(2, 4),
(2, 12),
(3, 1),
(3, 2),
(3, 4),
(3, 6),
(3, 9),
(3, 11),
(3, 16),
(4, 1),
(4, 4),
(4, 6),
(4, 8),
(4, 12),
(4, 15),
(4, 16),
(4, 19);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL CHECK (char_length(`password`) >= 4),
  `is_admin` tinyint(1) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `is_admin`, `token`) VALUES
(1, 'Admin', 'Experience', 'Admin@gmail.com', '$2b$10$Vc.mK63apIYxlJjrnw3JJec8Dcf4h4PKa2CvCzxE2bHT/suNAVkau', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiQWRtaW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IkV4cGVyaWVuY2UiLCJpYXQiOjE3MzM2NjIxNjAsImV4cCI6MTczNDI2Njk2MH0._ieObkJfq3xwMd_0-N1psNWcIyI6kRZslYPfLpFvE-'),
(2, 'User', 'Experience', 'User@gmail.com', '$2b$10$Y3gnU2UQfpfM0SeugqkOnehqTrvyyyOnXU24teG8tGBUKta1pyy0S', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiVXNlckBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiZmlyc3ROYW1lIjoiVXNlciIsImxhc3ROYW1lIjoiRXhwZXJpZW5jZSIsImlhdCI6MTczMzY2MjIwNSwiZXhwIjoxNzM0MjY3MDA1fQ.dAU_Lze05nxwCfDEK5vDEJ-IUxfdtRqcIe5dZ65yS5E'),
(3, 'User1', 'Experience', 'User1@gmail.com', '$2b$10$a6zozevvIytxfpVWvLMNYObrFJ3BkLVFOfnoOMALfuvaUPFdApbE2', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiVXNlcjFAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImZpcnN0TmFtZSI6IlVzZXIxIiwibGFzdE5hbWUiOiJFeHBlcmllbmNlIiwiaWF0IjoxNzMzNzI3ODQ1LCJleHAiOjE3MzQzMzI2NDV9.L-NckBcS4y-rxNwlI5SEQUw02xaJfpVGWNl09nPoB'),
(4, 'User2', 'Experience', 'User2@gmail.com', '$2b$10$mA0XnNIE5hbb6Y8fyFtwXe5yVx7A8ouJS3XonO9iuPkEP.0AIBMi.', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiVXNlcjJAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImZpcnN0TmFtZSI6IlVzZXIyIiwibGFzdE5hbWUiOiJFeHBlcmllbmNlIiwiaWF0IjoxNzMzNzM2NjYxLCJleHAiOjE3MzQzNDE0NjF9.o7r64GXkk-nYEvgdaJT_jaWwlBAtX9rjbM2aJSMZU'),
(5, 'User3', 'Experience', 'User31@gmail.com', '$2b$10$oWgpLBcgNh.cwt6LIw1dIu6kUvgMopSjYA4rRcIWts5BBB73ZcbkS', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiVXNlcjMxQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJmaXJzdE5hbWUiOiJVc2VyMyIsImxhc3ROYW1lIjoiRXhwZXJpZW5jZSIsImlhdCI6MTczMzczNzExMSwiZXhwIjoxNzM0MzQxOTExfQ.9tEo1OLEHuyinx-Evlhp-xOXGTDkjWewHZocX_W'),
(6, 'User4', ' Experience', 'User4@gmail.com', '$2b$10$k07kN11VUXoEKgK1p6JWi.jpAKhWvroNXyMe01APIrS9A7Vk9uTLS', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoiVXNlcjRAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImZpcnN0TmFtZSI6IlVzZXI0IiwibGFzdE5hbWUiOiIgRXhwZXJpZW5jZSIsImlhdCI6MTczMzczNzE3NCwiZXhwIjoxNzM0MzQxOTc0fQ.GN7sbUUkXMPXFPknJyekDpu3ei5elL10vdug0pp');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_file_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_file_name`) VALUES
(1, 'Sydney', 'Visit the iconic Sydney Opera House and enjoy the stunning harbor views.', '2024-08-16', '2024-08-26', 100.00, '6aaabac6-a705-47dc-b0f3-ecd377b03243.jpg'),
(2, 'Paris', 'Explore the Eiffel Tower, Louvre, and more in the romantic city of Paris.', '2024-11-01', '2024-12-30', 2000.00, '57140415-e9ba-4ec3-946d-007480483eb9.jpg'),
(3, 'Tokyo', 'Experience the culture, technology, and history in Japan’s capital.', '2024-08-27', '2024-09-15', 10000.00, '361c294d-2009-486f-9851-5501aed16255.jpg'),
(4, 'New York', 'Discover the Big Apple with its skyscrapers, Central Park, and Broadway.', '2024-09-09', '2024-09-19', 2200.00, '60664ec1-d369-4061-9187-0ebbe408fb15.jpg'),
(6, 'London', 'Visit iconic landmarks such as the Big Ben, Buckingham Palace, and the British Museum.', '2024-09-14', '2024-09-24', 2100.00, 'c4ec18ff-1aa2-420e-a1a2-cff08a164ef8.jpg'),
(7, 'Barcelona', 'Enjoy the beautiful beaches and architecture of the Mediterranean city.', '2024-09-17', '2024-09-27', 1900.00, '855f0fd7-bd10-4044-817b-1ced3a18efd2.jpg'),
(8, 'Berlin', 'Immerse yourself in the history and culture of Germany’s capital.', '2024-09-19', '2024-09-29', 1700.00, '8634af23-eca3-4862-9b81-ff5bb1aa7d02.jpg'),
(9, 'Amsterdam', 'Experience the beautiful canals and museums in the Netherlands capital.', '2024-09-30', '2024-10-09', 1600.00, '44f46459-65c4-41d2-9cae-d37d0952c51e.jpg'),
(10, 'Dubai', 'Explore the luxury and modern wonders of the UAE, from the Burj Khalifa to desert safaris.', '2024-10-04', '2024-10-14', 2500.00, '3ebf7185-55fb-4549-8928-cf23efcd6ee4.jpg'),
(11, 'Cape Town', 'Enjoy the stunning views from Table Mountain and the beautiful beaches of South Africa.', '2024-10-06', '2024-10-16', 1800.00, '1bfe742f-3f28-480a-8f35-52e6c5191fe6.jpg'),
(12, 'Los Angeles', 'Visit the entertainment capital of the world, home to Hollywood and famous beaches.', '2024-10-17', '2024-10-31', 2000.00, '7150fd3d-ce67-4903-a2fc-719d582fb1fb.jpg'),
(13, 'Rio de Janeiro', 'Relax on the beautiful beaches of Rio and explore the iconic Christ the Redeemer statue.', '2024-10-11', '2024-10-21', 1700.00, 'bdd6a733-bd6f-4530-a27f-733a2576a5e2.jpg'),
(14, 'Moscow', 'Explore Russia’s capital with its grand architecture and historical landmarks.', '2024-10-14', '2024-10-24', 2200.00, '81066a0d-8808-4ff2-8424-14301b296fd5.jpg'),
(15, 'Seoul', 'Visit the vibrant city of Seoul with its mix of traditional and modern attractions.', '2024-10-16', '2024-10-26', 1900.00, 'd5d8c874-1ab6-45da-aba2-9981fe1efb81.jpg'),
(16, 'Cairo', 'Discover the ancient pyramids, Sphinx, and Egypt’s fascinating history.', '2024-10-19', '2024-10-29', 1600.00, '9e6980fe-b01c-4022-8df5-2aa47af18575.jpg'),
(17, 'Bangkok', 'Explore the bustling capital of Thailand, known for its street food, temples, and vibrant nightlife.', '2024-10-21', '2024-10-31', 1500.00, '36196e6b-bdfc-42fc-9f18-91e692370e56.jpg'),
(18, 'Buenos Aires', 'Experience the culture, art, and food of Argentina’s capital.', '2024-10-24', '2024-11-03', 1800.00, '1d9ee88e-9716-4975-9510-6adf9aef2f44.jpg'),
(19, 'Istanbul', 'Discover the rich history and culture of the city that bridges Europe and Asia.', '2024-10-26', '2024-11-28', 1700.00, 'bcbbd409-10ac-4b7b-96d5-c074e9c5b38d.jpg'),
(20, 'Singapore', 'Enjoy the modern, clean, and diverse city-state with attractions like Gardens by the Bay and Marina Bay Sands.', '2024-10-31', '2024-11-09', 2000.00, '984c1c21-3c6d-47d9-9813-3ebc880f7e5c.jpg'),
(28, 'ד', 'ד', '2024-12-10', '2024-12-14', 1.00, 'f670d239-1af3-4d6d-b1d3-243d34d24b6e.jpg');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- אינדקסים לטבלה `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
