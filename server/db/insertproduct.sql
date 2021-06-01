-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: together
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `insertproduct`
--

DROP TABLE IF EXISTS `insertproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insertproduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(256) DEFAULT NULL,
  `itime` datetime DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `filename` varchar(256) DEFAULT NULL,
  `detail` text,
  `inguser` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insertproduct`
--

LOCK TABLES `insertproduct` WRITE;
/*!40000 ALTER TABLE `insertproduct` DISABLE KEYS */;
INSERT INTO `insertproduct` VALUES (1,'tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU','2021-05-25 03:15:21','111111','13a94f8e08c7f0413d17ad6534e724ba','2222',2),(2,'tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU','2021-05-25 03:16:08','dff','ec7cf4044471163b56ef35bc75ee0ee5','dd',2),(3,'tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU','2021-05-25 03:16:57','124','8cb37b29207324140d25ba8294e1934e','3131',2);
/*!40000 ALTER TABLE `insertproduct` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-02  2:24:30
