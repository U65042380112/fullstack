GRANT ALL PRIVILEGES ON * . * TO 'captun'@'%';

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



--
--

-- --------------------------------------------------------

--
--

CREATE TABLE `office` (
  `idoffice` varchar(2) NOT NULL,
  `oname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
--

INSERT INTO `office` (`idoffice`, `oname`) VALUES
('00', '--PLS SELECT DATA--'),
('01', 'OFFICE1'),
('02', 'OFFICE2');

-- --------------------------------------------------------

--
--

CREATE TABLE `worker` (
  `idworker` varchar(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `idoffice` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
--

INSERT INTO `worker` (`idworker`, `fname`, `lname`, `idoffice`) VALUES
('65042380112', 'Ukrit', 'Jumrunjamjarus', '02'),
('asdsad', '555555555', '5555555555555', '01');

--
--

--
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`idoffice`);

--
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`idworker`),
  ADD KEY `idoffice` (`idoffice`);

--
--

--
--
ALTER TABLE `worker`
  ADD CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`idoffice`) REFERENCES `office` (`idoffice`);
COMMIT;

