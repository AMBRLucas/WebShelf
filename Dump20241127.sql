-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: webshelf
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `loaned` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `library_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaojxagnfmppd09k35kye5eph5` (`library_id`),
  CONSTRAINT `FKaojxagnfmppd09k35kye5eph5` FOREIGN KEY (`library_id`) REFERENCES `library` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('092756','George R. R. Martin','Fantasia',_binary '\0','A Guerra dos Tronos','241107112253'),('092826','George R. R Martin','Fantasia',_binary '\0','A Guerra dos Cinco Reis','241107112253'),('092904','George R. R. Martin','Fantasia',_binary '','Tormenta de Espadas','241107112253'),('092933','George R. R. Martin','Fantasia',_binary '\0','Festim dos Corvos','241107112253'),('093009','George R. R. Martin','Fantasia',_binary '\0','Dança dos Dragões','241107112253'),('093125','Samantha Shannon','Fantasia',_binary '\0','O Priorado da Laranjeira I','241107112253'),('093214','Samantha Shannon','Fantasia',_binary '\0','O Priorado da Laranjeira II','241107112253'),('093352','Suzanne Collins','Distopia',_binary '\0','Jogos Vorazes','241107112253'),('093427','Suzanne Collins','Distopia',_binary '','Jogos Vorazes: Em Chamas','241107112253'),('094139','Suzanne Collins','Distopia',_binary '\0','Jogos Vorazes: A Esperança','241107112253'),('094938','Franz Kafka','Não-Ficção',_binary '\0','A Metamorfose','241107112253'),('095001','Albert Camus','Não-Ficção',_binary '\0','O Estrangeiro','241107112253'),('095029','Albert Camus','Não-Ficção',_binary '\0','O Processo','241107112253'),('095144','Chuck Palaniuk','Drama',_binary '','Clube da Luta','241107112253');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` varchar(255) NOT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `has_active_loan` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `registry_date` date NOT NULL,
  `library_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5sd1dukhd2g8bvcm2i2ps4hql` (`library_id`),
  CONSTRAINT `FK5sd1dukhd2g8bvcm2i2ps4hql` FOREIGN KEY (`library_id`) REFERENCES `library` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('241107112337','477.255.258-82','lucas.silvaambrosio@hotmail.com',_binary '','Lucas Henrique','2024-11-07','241107112253'),('241107112455','477.255.258-82','lucas.silvaambrosio@hotmail.com',_binary '\0','Lucas Henrique','2024-11-07','241107112413'),('241107113745','464.646.464-64','Andre.batist464@gmail.com',_binary '','André Batista','2024-11-07','241107112253'),('241107113822','234.908.239-78','Paulo.silva321@gmail.com',_binary '','Paulo Silva','2024-11-07','241107112253'),('241107113945','908.765.234-12','Silva.aline@outlook.com',_binary '\0','Aline Silva','2024-11-07','241107112253'),('241107114018','879.657.342-12','Julia@hotmail.com',_binary '\0','Julia','2024-11-07','241107112253'),('241126104235','124.987.345-65','zkshfiow@gmail.com',_binary '\0','aashgf','2024-11-26','241107112253');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library`
--

DROP TABLE IF EXISTS `library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library` (
  `id` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `library_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rxgiipxnarh7ihhhjtq931a78` (`email`),
  UNIQUE KEY `UK_k1q3l3qsqywala4j8ncfufpj7` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library`
--

LOCK TABLES `library` WRITE;
/*!40000 ALTER TABLE `library` DISABLE KEYS */;
INSERT INTO `library` VALUES ('241107112253','CeosLibrary@outlook.com','Ceos Library','CeosTItan','CeosLib'),('241107112413','lelibrary@hotmail.com','LeLibrary','LeLibrary123','LeLib');
/*!40000 ALTER TABLE `library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `id` varchar(255) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `loan_date` date NOT NULL,
  `return_date` date NOT NULL,
  `book_id` varchar(255) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  `library_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK88c0ydlo57pcgp137tntrgqx1` (`book_id`),
  KEY `FK62s5k229ouak16t2k5pvq4n16` (`client_id`),
  KEY `FKgjticxpyvhf1w48gm96t0uev3` (`library_id`),
  CONSTRAINT `FK62s5k229ouak16t2k5pvq4n16` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `FK88c0ydlo57pcgp137tntrgqx1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FKgjticxpyvhf1w48gm96t0uev3` FOREIGN KEY (`library_id`) REFERENCES `library` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES ('241111095244',_binary '','2024-11-11','2024-11-14','095144','241107112337','241107112253'),('241111095402',_binary '\0','2024-11-11','2024-11-13','093009','241107113822','241107112253'),('241111095429',_binary '\0','2024-11-11','2024-11-13','093214','241107113945','241107112253'),('241112000205',_binary '\0','2024-11-12','2024-11-13','093427','241107113745','241107112253'),('241113080458',_binary '\0','2024-11-13','2024-11-23','092756','241107114018','241107112253'),('241113104322',_binary '\0','2024-11-13','2024-11-23','092904','241107113745','241107112253'),('241113104400',_binary '','2024-11-13','2024-11-22','093427','241107113822','241107112253'),('241113104503',_binary '\0','2024-11-13','2024-11-13','093009','241107113945','241107112253'),('241113111312',_binary '\0','2024-11-13','2024-11-23','093125','241107113945','241107112253'),('241125184138',_binary '','2024-11-25','2024-11-29','092904','241107113745','241107112253'),('241126104127',_binary '\0','2024-11-26','2024-11-26','092756','241107113945','241107112253');
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'webshelf'
--

--
-- Dumping routines for database 'webshelf'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27 20:10:38
