-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2024 at 01:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeems`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(10, 'admin@gmail.com', '$2b$10$tCgQfg0Xr2lbo0bwWhQyPeT/OahFxxnT6egDTjymbV1p/VQ06zuP2'),
(11, 'sparrow_admin@gmail.com', '$2b$10$LU6Q/mrgkGMNYdBLxY/BBe7anbT8K31g9QROYOT4QFym7p2aAnUee'),
(16, 'pratikadmin@gmail.com', '$2b$10$Xcv.HIm7bAVWRvwu1fJJIebWaJds8sKYDkng7Gvc9GzzpN3COiyb6'),
(17, 'testadmin@gmail.com', '$2b$10$4bmdQjiYA7CFZcbY6QQtvOAJtF4X8M6dzWzlTBEPQSQOqt9q.OIXC');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(4, 'Developer '),
(5, 'Software Developer '),
(7, 'Marketing'),
(10, 'Data Analysis');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(150) NOT NULL,
  `salary` int(11) NOT NULL,
  `address` varchar(30) NOT NULL,
  `image` varchar(60) NOT NULL,
  `category_id` int(11) NOT NULL,
  `applied_leave` int(11) DEFAULT NULL,
  `leave_status` tinyint(1) DEFAULT NULL,
  `btnVisible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `password`, `salary`, `address`, `image`, `category_id`, `applied_leave`, `leave_status`, `btnVisible`) VALUES
(17, 'parvez', 'parvez@gmail.com', '$2b$10$G43R6a00cy7k1u4aXqDIEeNZCUI1MhPekDdwJnMoYcBtMACV/dl2u', 100000, 'vadodara', 'image_1710844804924.jpg', 4, 1, 2, 0),
(20, 'pratik kharva', 'pratik@gmail.com', '$2b$10$DOjLqGIVgk.CyCDhN1Is7OBX9k7zcLRlDDMtLGoThMWqeV2UWqHi2', 100000, 'vadodara', 'image_1710929845726.jpg', 4, 1, 2, 0),
(38, 'sparrow', 'sparrow@gmail.com', '$2b$10$4v5ZlwPe/JMoNfTUJAWDaekfRNUbAZheMFaNlKy08q70Idw5eT3T.', 100000, 'vadodara', 'image_1711023641855.jpg', 5, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leave_request`
--

CREATE TABLE `leave_request` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(140) NOT NULL,
  `startDate` varchar(100) DEFAULT NULL,
  `endDate` varchar(100) DEFAULT NULL,
  `reason` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_request`
--

INSERT INTO `leave_request` (`id`, `name`, `email`, `startDate`, `endDate`, `reason`) VALUES
(10, 'parvez', 'parvez@gmail.com', '2024-03-20', '2024-03-22', 'holi enjoyment '),
(11, 'parvez', 'parvez@gmail.com', '2024-03-21', '2024-03-14', 'holi enjoyment '),
(12, 'parvez', 'parvez@gmail.com', '2024-03-20', '2024-03-21', 'holi enjoyment '),
(13, 'parvez', 'parvez@gmail.com', '2024-03-20', '2024-03-21', 'holi enjoyment '),
(14, 'sparrow', 'sparrow@gmail.com', '2024-03-22', '2024-03-23', 'holi enjoyment '),
(15, 'test', 'test@gmail.com', '2024-03-23', '2024-03-23', 'holi enjoyment '),
(16, 'test', 'test@gmail.com', '2024-03-23', '2024-03-23', 'holi enjoyment '),
(17, 'test', 'test@gmail.com', '2024-03-23', '2024-03-23', 'holi enjoyment '),
(18, 'test', 'test@gmail.com', '2024-03-23', '2024-03-23', 'holi enjoyment '),
(19, 'pratik kharva', 'pratik@gmail.com', '2024-03-22', '2024-03-22', 'holi enjoyment '),
(20, 'pratik kharva', 'pratik@gmail.com', '2024-03-22', '2024-03-22', 'holi enjoyment '),
(21, 'pratik kharva', 'pratik@gmail.com', '2024-03-26', '2024-04-02', 'holi enjoyment '),
(22, 'pratik kharva', 'pratik@gmail.com', '2024-03-26', '2024-03-30', 'holi enjoyment '),
(23, 'pratik kharva', 'pratik@gmail.com', '2024-03-26', '2024-03-27', 'holi enjoyment '),
(24, 'pratik kharva', 'pratik@gmail.com', '2024-03-27', '2024-03-27', 'holi enjoyment '),
(25, 'pratik kharva', 'pratik@gmail.com', '2024-03-27', '2024-03-27', 'holi enjoyment '),
(26, 'parvez', 'parvez@gmail.com', '2024-03-28', '2024-03-28', 'holi enjoyment '),
(27, 'pratik', 'pratik@gmail.com', '2024-03-28', '2024-03-28', 'holi enjoyment '),
(28, 'parvez', 'parvez@gmail.com', '2024-03-27', '2024-03-27', 'holi enjoyment '),
(29, 'pratik kharva', 'pratik@gmail.com', '2024-03-27', '2024-03-27', 'holi enjoyment '),
(30, 'pratik kharva', 'pratik@gmail.com', '2024-03-30', '2024-03-31', 'holi enjoyment '),
(31, 'pratik kharva', 'pratik@gmail.com', '2024-03-30', '2024-03-30', 'holi enjoyment '),
(32, 'pratik kharva', 'pratik@gmail.com', '2024-03-29', '2024-03-30', 'holi enjoyment '),
(33, 'pratik kharva', 'pratik@gmail.com', '2024-03-28', '2024-03-28', 'holi enjoyment '),
(34, 'pratik kharva', 'pratik@gmail.com', '2024-03-29', '2024-03-29', 'holi enjoyment ');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(150) NOT NULL,
  `salary` int(11) NOT NULL,
  `address` varchar(150) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `name`, `email`, `password`, `salary`, `address`, `image`) VALUES
(3, 'pratikManager', 'pratikmanager@gmail.com', '$2b$10$rApptlti/NbZxcFwYY1Wse4GN9SNeJ1VS3uLji5T7eAvr1jqF1iEe', 100002, 'vadodara1', 'image_1710832637784.jpg'),
(11, 'manager 1', 'manager@gmail.com', '$2b$10$wnLBaARKbisuxAT8n3rx1euHsjjdofUCawheKFFxk.zmUdcVsz3S.', 10000, 'DDU', 'image_1711021182738.jpg'),
(12, 'manager1', 'manager1@gmail.com', '$2b$10$eH6fTK1A1st75O/Wce5ZMOZ0NMFZGsvivdtzUMngY8zDGmSuX.u4q', 5000, 'DDU', 'image_1711022921884.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `leave_request`
--
ALTER TABLE `leave_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `leave_request`
--
ALTER TABLE `leave_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
