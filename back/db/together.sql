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
  `image` longblob,
  `detail` text,
  `inguser` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insertproduct`
--

LOCK TABLES `insertproduct` WRITE;
/*!40000 ALTER TABLE `insertproduct` DISABLE KEYS */;
INSERT INTO `insertproduct` VALUES (1,'test',NULL,'11',NULL,NULL,NULL),(2,'test',NULL,'11',NULL,NULL,NULL),(3,'test',NULL,'11',NULL,NULL,3),(4,NULL,NULL,NULL,NULL,'eeee',NULL),(5,'test',NULL,'11',NULL,'33',NULL),(6,'test','2021-05-13 05:38:59','11',NULL,'33',NULL),(7,'tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU','2021-05-13 05:40:24','33',NULL,'55',2),(8,'tr0_eLNNTW1BEgfJewf3Sc6Mu_jGDngsok6XlwCD1IU','2021-05-13 13:18:40','33',NULL,'55',2);
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

-- Dump completed on 2021-05-13 14:14:34
