-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: vultr-prod-5ab1d18d-fe63-456e-9c98-cb4d6bbc0738-vultr-prod-4117.vultrdb.com    Database: devdb
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'c851a0f8-29b8-11ee-99fc-560004847593:1-42967';

--
-- Table structure for table `animals`
--

DROP TABLE IF EXISTS `animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals` (
  `age` int NOT NULL,
  `enter_age` int NOT NULL,
  `adoption_start_date` datetime(6) DEFAULT NULL,
  `enter_date` datetime(6) DEFAULT NULL,
  `adoption_status` enum('IMPOSSIBLE','POSSIBLE') DEFAULT NULL,
  `animal_name` varchar(255) DEFAULT NULL,
  `animal_photo_url` varchar(255) DEFAULT NULL,
  `animal_uuid` varchar(255) NOT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `center_uuid` varchar(255) DEFAULT NULL,
  `character_type` enum('ACTIVE','PEACE','SENSITIVE') DEFAULT NULL,
  `find_place` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE') DEFAULT NULL,
  `notice_date` varchar(255) DEFAULT NULL,
  `specie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`animal_uuid`),
  KEY `FK8h0huft03lrjxyyew39nm4ipj` (`center_uuid`),
  CONSTRAINT `FK8h0huft03lrjxyyew39nm4ipj` FOREIGN KEY (`center_uuid`) REFERENCES `centers` (`center_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
INSERT INTO `animals` VALUES (3,3,'2023-07-18 13:00:00.000000','2023-07-06 12:00:00.000000','POSSIBLE','민규','2023-08-17T10:54:52.17206297520230707025515020.jpg','1ecf1f13-4622-4abc-9377-3b490e7e29dd','진도','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','호동 137-1 번지 주변','MALE','2023-07-07 ~ 2023-07-17','개'),(2,5,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','뽀삐','2023-08-16T05:57:01.010742170동물1.jpg','2b0c0289-af45-4584-8f51-a80079eb2e6d','닥스훈트','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','SENSITIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(3,3,'2023-07-14 13:00:00.000000','2023-07-03 12:00:00.000000','POSSIBLE','리즈','2023-08-17T10:55:28.51036422020230703051853237.jpg','34e14f1b-b533-40a6-a8e2-f2c6c989b119','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','계산동 산39-2번지 주변','FEMALE','2023-07-03 ~ 2023-07-13','개'),(4,4,'2023-07-25 13:00:00.000000','2023-07-11 12:00:00.000000','POSSIBLE','나연','2023-08-17T10:39:29.02834776120230711052658905.jpg','3f04de3b-941d-4ed2-8a08-552107ec1e2e','웰시코기','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','가수원지구대 인근','MALE','2023-07-12 ~ 2023-07-24','개'),(4,11,NULL,NULL,'POSSIBLE','뿌뿌','2023-08-16T05:59:55.555352195동물2.jpg','48f9adb0-6ef8-4821-8284-dd0f7a9c8c50','닥스훈트','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','SENSITIVE','adf','MALE','','강아지 종'),(3,10,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','뷔','2023-08-16T05:57:01.010742170동물1.jpg','4e6dd840-89b8-41a9-b86c-0428c2e677da','강아지 품종','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','ACTIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(3,10,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','옥지','2023-08-16T05:59:55.555352195동물2.jpg','4ebdc9b5-e116-4d55-9e22-e7e8f8b41725','강아지 품종','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','SENSITIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(3,1,'2023-08-08 13:00:00.000000','2023-07-20 12:00:00.000000','POSSIBLE','우빈','2023-08-17T10:56:20.66219357920230722034519661.jpg','4eede345-3533-42db-896d-817c3beb62c1','햄스터','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','대동 펜타뷰@ 인근','MALE','2023-07-26 ~ 2023-08-07','기타동물'),(13,4,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','삐뽀','2023-08-16T05:57:01.010742170동물1.jpg','51d69826-737d-49dc-a7c0-7651edcdc210','리트','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','강아지 종'),(2147483646,6,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','삐삐','2023-08-16T05:57:01.010742170동물1.jpg','561ba85b-e6e1-4608-a803-c31164c15cc8','리버','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','강아지 종'),(3,3,'2023-08-01 13:00:00.000000','2023-07-20 12:00:00.000000','POSSIBLE','진','2023-08-17T10:56:46.00509086520230721031408599.jpg','6890c086-ad45-4c91-acf7-85d753b60948','코리안숏헤어','26ebf26f-c289-44a7-93a7-7a77233f8af2','SENSITIVE','용두로 24-40 번길 주변','FEMALE','2023-07-21 ~ 2023-07-31','고양이'),(2,1,'2023-08-29 13:00:00.000000','2023-08-17 12:00:00.000000','POSSIBLE','아이사','2023-08-17T10:49:33.95186180920230817031857086.jpg','6e39a641-4325-4899-befd-fc4164d38015','코리안숏헤어','26ebf26f-c289-44a7-93a7-7a77233f8af2','SENSITIVE','하기동 송림@ 주변','FEMALE','2023-08-16 ~ 2023-08-28','고양이'),(6,5,'2023-07-29 13:00:00.000000','2023-07-13 12:00:00.000000','POSSIBLE','푸','2023-08-17T10:37:12.99240753520230714041716126.jpg','6fee1124-3ea8-483b-989b-75cd26fa7ee9','푸들','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','도마동 120-21 인근','MALE','2023-07-18 ~ 2023-07-28','개'),(3,3,'2023-07-22 13:00:00.000000','2023-07-10 12:00:00.000000','POSSIBLE','수지','','83510424-c94a-4c6f-9084-ed7f364b8b5d','푸들','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','봉명동 매드블럭 주변','FEMALE','2023-07-11 ~ 2023-07-21','개'),(3,2,'2023-07-29 22:46:17.348000','2023-07-29 22:46:17.348000','POSSIBLE','밤돌이','2023-08-17T08:14:28.32591012920230716020957910.jpg','8ac4b9d7-6eb2-4de0-8eca-35c04e59fb23','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','SENSITIVE','유성구 계산동 155-1 인근','MALE','2023-07-18 ~ 2023-07-28','개'),(1,4,'2023-07-18 13:00:00.000000','2023-07-05 12:00:00.000000','POSSIBLE','현재','2023-08-17T10:54:21.47713539420230706052331298.jpg','8da42550-a93d-4501-a9ed-be736eef631e','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','안산동 222-4번지 주변','MALE','2023-07-05 ~ 2023-07-17','개'),(3,2,'2023-07-21 13:00:00.000000','2023-07-08 12:00:00.000000','POSSIBLE','하루','2023-08-17T10:52:11.66885417220230816040429374.jpg','8e013122-fb3f-48ca-ba41-5b03496abbe5','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','SENSITIVE','유성구 와룡로 206 대광로제비앙@ 주변','FEMALE','2023-07-10 ~ 2023-07-20','개'),(3,10,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','은우','2023-08-17T10:57:07.93136097220230722044042491.jpg','8eaf8f3e-1bdc-4ede-9d9a-62b528254925','요크셔테리어','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(3,10,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','슈가','2023-08-17T10:49:06.37062988220230816025848268.jpg','9692459d-ce16-4b0c-b0f8-95bd841730e3','강아지 품종','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(2,1,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','뿌뿌','2023-08-17T10:49:06.37062988220230816025848268.jpg','982813f2-823d-4286-bc39-ade068d45ddc','골든','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','강아지 종'),(2,1,'2023-08-29 13:00:00.000000','2023-08-16 12:00:00.000000','POSSIBLE','지원','2023-08-17T10:49:06.37062988220230816025848268.jpg','98e5163f-7575-4c9a-87f0-f8346fd3ab4f','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','목상동 149-14번지 주변','MALE','2023-08-16 ~ 2023-08-28','개'),(1,1,NULL,NULL,'IMPOSSIBLE','가을','2023-08-16T06:02:02.181077291new_logo.jpg','a17e3024-d3b0-46f1-a4c6-6acbba2d388f','asdf','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','ACTIVE','asdf','MALE','','asdf'),(1,21,NULL,NULL,'IMPOSSIBLE','야옹이','2023-08-17T00:47:39.411290998adopt_process_1.png','a1a6f74e-0bb1-40fd-be5a-12b01f20f6eb','고양이','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','SENSITIVE','대전','FEMALE','','고양이'),(3,1,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','정국','2023-08-17T10:37:12.99240753520230714041716126.jpg','aa','강아지 품종','62feb91a-d6eb-4116-935c-7dc930be315f','ACTIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(6,5,'2023-07-21 13:00:00.000000','2023-07-09 12:00:00.000000','POSSIBLE','원영','2023-08-17T10:51:37.41832002720230804040043146.jpg','b0d51cae-c1c3-40e6-8ed9-b298e1f822c8','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','brt버스종점 주변','MALE','2023-07-10 ~ 2023-07-20','개'),(3,2,'2023-07-29 13:00:00.000000','2023-07-29 13:00:00.000000','POSSIBLE','밤순이','','b194c97a-8bc6-4896-95e3-07441b9739f5','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','SENSITIVE','유성구 계산동 155-1 인근','MALE','2023-07-18 ~ 2023-07-28','개'),(3,3,'2023-07-25 13:00:00.000000','2023-07-12 12:00:00.000000','POSSIBLE','채원','2023-08-17T10:38:21.04815461520230815111055234.jpg','b2d17aa7-a6f2-4549-a1cd-1dd616b3c9a7','말티즈','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','어은동 한국항공우주연구원 주변','FEMALE','2023-07-12 ~ 2023-07-24','개'),(3,10,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','제이홉','2023-08-17T10:49:06.37062988220230816025848268.jpg','be38c60c-094a-4a70-af29-3020556aa1a3','강아지 품종','62feb91a-d6eb-4116-935c-7dc930be315f','ACTIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(3,2,'2023-07-25 13:00:00.000000','2023-07-11 12:00:00.000000','POSSIBLE','우기','2023-08-17T10:40:16.40649090720230711052716399.jpg','c08b50eb-953d-42c5-ac9f-81424eb4b3d6','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','대동천좌안5길 31 인근','MALE','2023-07-14 ~ 2023-07-24','개'),(1,21,NULL,NULL,'POSSIBLE','RM','2023-08-17T10:49:06.37062988220230816025848268.jpg','c0f86fd7-820d-4bf8-b27d-d3729daf0a6b','asddf','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','PEACE','123','MALE','','asdf'),(3,10,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','리트','2023-08-17T10:39:29.02834776120230711052658905.jpg','cf7e3cfd-6e8a-4638-86d3-51f3a3f5b7aa','웰시코기','62feb91a-d6eb-4116-935c-7dc930be315f','ACTIVE','강아지 발견장소','MALE','2012.08.05~2013.09.01','강아지 종'),(2,1,'2023-08-29 13:00:00.000000','2023-08-16 12:00:00.000000','POSSIBLE','시은','2023-08-17T10:50:18.78488085320230816025742655.jpg','d2eb02a0-fadb-4a34-b724-9ae726e0005a','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','ACTIVE','목상동 149-14번지 주변','FEMALE','2023-08-16 ~ 2023-08-28','개'),(300,5,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','빠빠','2023-08-17T10:37:12.99240753520230714041716126.jpg','dd','푸들','d8ea4848-3925-440b-ac1a-ff0376363a47','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','강아지 종'),(8,7,'2023-08-04 13:00:00.000000','2023-07-22 12:00:00.000000','POSSIBLE','은우','2023-08-17T10:57:07.93136097220230722044042491.jpg','f3d67acb-6ff1-4d97-8153-2cd65cf40717','요크셔테리어','26ebf26f-c289-44a7-93a7-7a77233f8af2','SENSITIVE','장동로 277-6 주변','MALE','2023-07-24 ~ 2023-08-03','개'),(3,3,'2023-07-07 13:00:00.000000','2023-06-23 12:00:00.000000','POSSIBLE','지원','2023-08-17T10:49:06.37062988220230816025848268.jpg','f4ce9f7d-31e2-4d87-91e4-2f165be8df33','믹스','26ebf26f-c289-44a7-93a7-7a77233f8af2','PEACE','안금로 110-28 만년기업사 주변','MALE','2023-06-26 ~ 2023-07-06','개'),(3,200,'2023-08-15 10:08:10.021000','2023-08-15 10:08:10.021000','POSSIBLE','지민','2023-08-17T10:49:06.37062988220230816025848268.jpg','f98deb84-5e11-4e9a-a50a-54cd0fd13492','강아지','d8ea4848-3925-440b-ac1a-ff0376363a47','ACTIVE','발견장소','MALE','2012.08.05~2013.09.01','허스'),(5,7,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','피피','2023-08-17T10:56:46.00509086520230721031408599.jpg','ff','코리안숏헤어','d8ea4848-3925-440b-ac1a-ff0376363a47','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','강아지 종'),(7,4,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','파파','2023-08-17T10:56:20.66219357920230722034519661.jpg','hh','햄스터','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','햄스터'),(150,4,'2023-08-05 12:30:00.000000','2018-06-17 22:46:17.348000','POSSIBLE','빵빵','2023-08-17T10:55:28.51036422020230703051853237.jpg','ss','믹스','d8ea4848-3925-440b-ac1a-ff0376363a47','ACTIVE','강아지 발견장소','FEMALE','2012.08.05~2013.09.01','강아지 종');
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `board_photo_url` varchar(255) DEFAULT NULL,
  `center_uuid` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKsvlf1ubhpdm45525da5bdp05h` (`center_uuid`),
  KEY `FK4afxfdwrib8p3b183laowr6as` (`user_uuid`),
  CONSTRAINT `FK4afxfdwrib8p3b183laowr6as` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`),
  CONSTRAINT `FKsvlf1ubhpdm45525da5bdp05h` FOREIGN KEY (`center_uuid`) REFERENCES `centers` (`center_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (4,'2023-08-11 03:30:47.762408',NULL,'null','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','content','title','adopt','89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(5,'2023-08-11 03:34:12.448003','2023-08-14 17:07:15.659584',NULL,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','content1(수정)','title1(수정)','adopt','89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(24,'2023-08-12 11:12:20.624218',NULL,'null','26ebf26f-c289-44a7-93a7-7a77233f8af2','내용','제목','notice','57989a8c-bad7-4e03-aff2-aa668ffe3471'),(25,'2023-08-12 11:21:02.312397',NULL,'null','62feb91a-d6eb-4116-935c-7dc930be315f','내용1','제목1','notice','57989a8c-bad7-4e03-aff2-aa668ffe3471'),(26,'2023-08-12 13:24:18.316214',NULL,'null','62feb91a-d6eb-4116-935c-7dc930be315f','QnA','QnA','qna','89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(27,'2023-08-12 13:25:13.178990',NULL,'null','d8ea4848-3925-440b-ac1a-ff0376363a47','후원 후기 내용','후원 후기','donate','89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(28,'2023-08-12 16:27:43.218398',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','입양후기 내용','입양후기','adopt','57989a8c-bad7-4e03-aff2-aa668ffe3471'),(29,'2023-08-13 05:43:37.509952',NULL,'','d8ea4848-3925-440b-ac1a-ff0376363a47','입양후기 content','입양후기 title','adopt','57989a8c-bad7-4e03-aff2-aa668ffe3471'),(33,'2023-08-13 07:00:50.124071',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','후기후기후귀후기ㅜ히구','후기후기후기후귛','adopt','eff502a1-3762-4c97-84af-dd4521c38343'),(34,'2023-08-13 07:02:13.538346',NULL,'','d8ea4848-3925-440b-ac1a-ff0376363a47','흠흠 보호소 후원 후기','흠흠 보호소 후원 후기','support','eff502a1-3762-4c97-84af-dd4521c38343'),(35,'2023-08-13 07:02:47.745528',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','서울 질문게시판','서울 질문게시판','support','eff502a1-3762-4c97-84af-dd4521c38343'),(36,'2023-08-13 07:11:46.017548',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','질문게시글 내용','질문게시글 작성','qna','eff502a1-3762-4c97-84af-dd4521c38343'),(37,'2023-08-13 07:12:03.593721',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','서울 게시글 내용','서울 게시글 작성','qna','eff502a1-3762-4c97-84af-dd4521c38343'),(50,'2023-08-14 07:37:37.661298','2023-08-14 17:29:37.304884',NULL,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','(tnwjd)다른곳사진테스트','다른곳 사진테스트(tnwjd)','qna','89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(59,'2023-08-14 13:33:44.544736',NULL,'blob:http://localhost:3000/c7a8c2a8-729a-47de-b367-5552e18edee2','62feb91a-d6eb-4116-935c-7dc930be315f','사진','사진','adopt','89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(116,'2023-08-16 07:27:25.468602',NULL,NULL,'26ebf26f-c289-44a7-93a7-7a77233f8af2','바잉','하잉','notice','b830ee9c-3a10-4d88-9a34-82de417177ee'),(124,'2023-08-17 05:48:03.498069',NULL,NULL,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','123','안뇽','adopt','341b223e-808c-4c2c-8592-b32fcf90b615'),(130,'2023-08-18 00:34:13.734660',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','보리 잘 지내고 있습니다! 보리는 저의 행복이예요. 다들 행복을 입양하세요!','우리 보리 입양 후기!','adopt','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(131,'2023-08-18 00:34:25.385935',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','설이 잘 적응했어요. 밥도 잘 먹고 공놀이도 잘해요!','설이보고가세요!!','adopt','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(132,'2023-08-18 00:34:33.928919',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','체력이 넘쳐나요! 앉아, 엎드려 잘합니다! 우리애기 기특해!!','순이 온지 2개월째!','adopt','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(133,'2023-08-18 00:36:36.493588',NULL,NULL,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','감사합니다','후원 감사합니다','support','57989a8c-bad7-4e03-aff2-aa668ffe3471'),(134,'2023-08-18 00:40:41.480033',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','자주 투닥거리고 서로 싸우듯이 놀고 너무 신난 나머지 캣볼을 몇번이고 무너뜨렸지만 모모와 모루를 입양하고 하루하루 너무 행복합니다 :)','모마와 모라예요','adopt','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(135,'2023-08-18 00:40:49.213729',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','너무 사랑스럽고 소중한 아이가 우리 가족이 되어준게 감사할 뿐입니다~~^^','진주 근황입니다','adopt','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(136,'2023-08-18 00:40:54.976172',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','이름은 도도입니다. 공고사진을 보고 고양이가 도도해 보인다고 이름을 지었답니다. ','유기견 입양 후기','adopt','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(137,'2023-08-18 00:41:51.962505',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','자원봉사단을 모집합니다. 4월부터 12월까지 진행합니다.','유기동물 임시보호 자원보사단 모집','notice','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(138,'2023-08-18 00:42:04.173342',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','홈페이지 새단장으로 홈페이지 서비스가 일시 중단될 수 있습니다','홈페이지 새단장으로 인한 안내','notice','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(139,'2023-08-18 00:42:11.565185',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','보호센터의 모든 동물 검사결과 전부 음성으로 확인되어 동물 입양을 재개합니다.','입양신청 재개 안내','notice','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(140,'2023-08-18 00:42:31.706903',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','자원봉사단을 모집합니다. 4월부터 12월까지 진행합니다.','유기동물 임시보호 자원보사단 모집','notice','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(141,'2023-08-18 00:42:40.223788',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','홈페이지 새단장으로 홈페이지 서비스가 일시 중단될 수 있습니다','홈페이지 새단장으로 인한 안내','notice','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(142,'2023-08-18 00:43:41.008625',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','후원을 통해 선풍기를 구매하였습니다. 시원한 여름을 보낼 수 있을것같아요! 감사합니다','선풍기 잘 샀습니다!','support','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(143,'2023-08-18 00:43:49.204143',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','이불을 구매하였습니다. 아이들이 좋아해요! 감사합니다','이불 후원 후기!','support','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(144,'2023-08-18 00:43:55.658669',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','아이들이 잘 먹어요! 감사합니다.','사료','support','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(145,'2023-08-18 00:45:21.833211',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','후원을 통해 선풍기를 구매하였습니다. 시원한 여름을 보낼 수 있을것같아요! 감사합니다','대형 선풍기 잘 샀습니다!','support','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(146,'2023-08-18 00:45:28.793646',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','아이들이 잘 먹어요. 역시 간식이 최고! 감사합니다','간식 잘 샀스비낟.!','support','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(147,'2023-08-18 00:45:35.820951',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','따뜻한 겨울을 보낼 수 있을것같아요! 감사합니다','이불 후원후기','support','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(148,'2023-08-18 00:46:17.483767',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','산책하기 신청했는데 조금 늦을것같아요','산책하기 질문','qna','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(149,'2023-08-18 00:46:24.609706',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','후원하는걸 잘 모르겠는데 어떻게 하는건가요?','질문있습니다','qna','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(150,'2023-08-18 00:46:32.781520',NULL,'','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','강아지를 잃어버렷는데 혹시 확인해주실 수 있나요?','혹시 이 강아지 있나요?','qna','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(151,'2023-08-18 00:46:42.720410',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','산책하기 신청 어떻게 하는건가요?','산책 모르겠어요','qna','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(152,'2023-08-18 00:46:51.434000',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','몇시부터 면담이 가능할까요?','보호소 갈려고 합니다','qna','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(153,'2023-08-18 00:47:01.694417',NULL,'','26ebf26f-c289-44a7-93a7-7a77233f8af2','공지사항에 대해 물어보고싶은데 전화해도 될까요?','공지사항 질문','qna','64d77ebf-c35e-49f9-a6bd-c219da149fa1');
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `center_items`
--

DROP TABLE IF EXISTS `center_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `center_items` (
  `current_price` int NOT NULL,
  `target_price` int NOT NULL,
  `center_items_id` bigint NOT NULL AUTO_INCREMENT,
  `live_id` bigint DEFAULT NULL,
  `center_uuid` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `item_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`center_items_id`),
  KEY `FKqkxhnp8pep7apeib928j0gv7x` (`center_uuid`),
  KEY `FKqd5tkb9usqsga4qqgyqd1v54l` (`live_id`),
  CONSTRAINT `FKqd5tkb9usqsga4qqgyqd1v54l` FOREIGN KEY (`live_id`) REFERENCES `lives` (`live_id`),
  CONSTRAINT `FKqkxhnp8pep7apeib928j0gv7x` FOREIGN KEY (`center_uuid`) REFERENCES `centers` (`center_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `center_items`
--

LOCK TABLES `center_items` WRITE;
/*!40000 ALTER TABLE `center_items` DISABLE KEYS */;
INSERT INTO `center_items` VALUES (0,40000,11,1252,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','선풍기','abc'),(0,30000,44,1234,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','또가스','abc'),(0,40000,88,123,'d8ea4848-3925-440b-ac1a-ff0376363a47','청결제품','abc'),(0,50000,99,456,'d8ea4848-3925-440b-ac1a-ff0376363a47','빗자루','abc'),(0,100000,100,789,'d8ea4848-3925-440b-ac1a-ff0376363a47','유용한물건','abc'),(0,33000,132,NULL,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','하네스(수정)',''),(0,50000,206,NULL,'0e2e4c27-f843-4340-9f4c-d686bdaf4e65','츄르','');
/*!40000 ALTER TABLE `center_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centers`
--

DROP TABLE IF EXISTS `centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `centers` (
  `center_address` varchar(255) DEFAULT NULL,
  `center_email` varchar(255) DEFAULT NULL,
  `center_name` varchar(255) DEFAULT NULL,
  `center_phone` varchar(255) DEFAULT NULL,
  `center_uuid` varchar(255) NOT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`center_uuid`),
  UNIQUE KEY `UK_9rtyam20afvqvpdw2r6v8eydh` (`user_uuid`),
  CONSTRAINT `FKk2gr8khiy5jxqd5v84f0o8km` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centers`
--

LOCK TABLES `centers` WRITE;
/*!40000 ALTER TABLE `centers` DISABLE KEYS */;
INSERT INTO `centers` VALUES ('대전 광역시','대전@대전.com','대전 보호센터','043-043-0431','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','3eccec9c-037d-4631-bd01-23dd022841e2'),('서울특별시','seoul@gmail.com','서울 보호센터','01012345678','26ebf26f-c289-44a7-93a7-7a77233f8af2','57989a8c-bad7-4e03-aff2-aa668ffe3471'),('center_address','center_email','부산 보호센터','center_phone','62feb91a-d6eb-4116-935c-7dc930be315f','9ac6ad4f-04b3-4e39-b4c0-8badc1c37f22'),('center_address','center_email','대구 보호센터','center_phone','d8ea4848-3925-440b-ac1a-ff0376363a47','63fd90af-496d-428f-9126-a67aba5726ca'),('광주광역시','000@000.com','광주 보호센터','000-000-0000','e9e0f1ee-a61c-4c5e-892f-56539c661c91','ac9a0869-60fc-4d73-a6f4-015a061aa7d7');
/*!40000 ALTER TABLE `centers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `board_id` bigint DEFAULT NULL,
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKo7l08y12wlmjbt81ey5wysk2g` (`board_id`),
  KEY `FKpe1li9w49d73hsn4wr20bsl9g` (`user_uuid`),
  CONSTRAINT `FKo7l08y12wlmjbt81ey5wysk2g` FOREIGN KEY (`board_id`) REFERENCES `boards` (`board_id`),
  CONSTRAINT `FKpe1li9w49d73hsn4wr20bsl9g` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donates`
--

DROP TABLE IF EXISTS `donates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donates` (
  `donate_price` int DEFAULT NULL,
  `center_items_id` bigint DEFAULT NULL,
  `donate_date` datetime(6) DEFAULT NULL,
  `donates_id` bigint NOT NULL AUTO_INCREMENT,
  `animal_uuid` varchar(255) DEFAULT NULL,
  `center_uuid` varchar(255) DEFAULT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`donates_id`),
  KEY `FKdhyxd3fb5wdm2bch5lwm0e9i8` (`animal_uuid`),
  KEY `FKl5fp1ognya9vp7qpcolmb4top` (`center_uuid`),
  KEY `FKh1vay49dl4rcgj49lrn28m2w9` (`center_items_id`),
  KEY `FK40px5fxvl5dgsfjend09ggsg2` (`user_uuid`),
  CONSTRAINT `FK40px5fxvl5dgsfjend09ggsg2` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`),
  CONSTRAINT `FKdhyxd3fb5wdm2bch5lwm0e9i8` FOREIGN KEY (`animal_uuid`) REFERENCES `animals` (`animal_uuid`),
  CONSTRAINT `FKh1vay49dl4rcgj49lrn28m2w9` FOREIGN KEY (`center_items_id`) REFERENCES `center_items` (`center_items_id`),
  CONSTRAINT `FKl5fp1ognya9vp7qpcolmb4top` FOREIGN KEY (`center_uuid`) REFERENCES `centers` (`center_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donates`
--

LOCK TABLES `donates` WRITE;
/*!40000 ALTER TABLE `donates` DISABLE KEYS */;
INSERT INTO `donates` VALUES (15000,44,'2023-08-15 00:06:59.982028',53,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','341b223e-808c-4c2c-8592-b32fcf90b615'),(5000,100,'2023-08-15 00:32:07.105244',60,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615'),(5000,88,'2023-08-15 00:32:10.846090',61,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615'),(5000,11,'2023-08-15 00:33:15.428038',62,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','341b223e-808c-4c2c-8592-b32fcf90b615'),(10000,44,'2023-08-15 03:55:42.738373',63,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','341b223e-808c-4c2c-8592-b32fcf90b615'),(10000,11,'2023-08-15 03:56:23.636956',64,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','341b223e-808c-4c2c-8592-b32fcf90b615'),(10000,44,'2023-08-15 07:11:37.306695',65,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','341b223e-808c-4c2c-8592-b32fcf90b615'),(10000,11,'2023-08-15 07:14:07.914665',66,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','341b223e-808c-4c2c-8592-b32fcf90b615'),(0,100,'2023-08-15 07:25:16.515518',67,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','3eccec9c-037d-4631-bd01-23dd022841e2'),(0,88,'2023-08-16 08:42:08.865143',92,'hh','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615'),(0,99,'2023-08-16 08:42:22.198188',93,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615'),(10000,99,'2023-08-16 08:53:31.777066',94,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(10000,99,'2023-08-16 15:00:11.597194',95,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(16000,88,'2023-08-17 01:27:09.924030',96,'ff','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615'),(10000,99,'2023-08-17 14:44:20.112669',104,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615'),(30000,100,'2023-08-17 14:44:32.910932',105,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','341b223e-808c-4c2c-8592-b32fcf90b615');
/*!40000 ALTER TABLE `donates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interests` (
  `interest_id` int NOT NULL AUTO_INCREMENT,
  `animal_uuid` varchar(255) DEFAULT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`interest_id`),
  KEY `FKs3riuayce85qb3cn7alhqxrcr` (`animal_uuid`),
  KEY `FKrrmairxbgm9fd1777imgm42nt` (`user_uuid`),
  CONSTRAINT `FKrrmairxbgm9fd1777imgm42nt` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`),
  CONSTRAINT `FKs3riuayce85qb3cn7alhqxrcr` FOREIGN KEY (`animal_uuid`) REFERENCES `animals` (`animal_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
INSERT INTO `interests` VALUES (1,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(2,'4e6dd840-89b8-41a9-b86c-0428c2e677da','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(3,'9692459d-ce16-4b0c-b0f8-95bd841730e3','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(4,'51d69826-737d-49dc-a7c0-7651edcdc210','341b223e-808c-4c2c-8592-b32fcf90b615');
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lives`
--

DROP TABLE IF EXISTS `lives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lives` (
  `live_id` bigint NOT NULL AUTO_INCREMENT,
  `animal_uuid` varchar(255) DEFAULT NULL,
  `center_uuid` varchar(255) DEFAULT NULL,
  `session_name` varchar(255) DEFAULT NULL,
  `thumbnail_image_url` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`live_id`),
  UNIQUE KEY `UK_5j8jqs0caiqirrls76ylfqsjo` (`animal_uuid`),
  KEY `FKqd1p3f5grusp1q7669spohl1t` (`center_uuid`),
  CONSTRAINT `FKngc0gwf9qlok67itx1stcel7m` FOREIGN KEY (`animal_uuid`) REFERENCES `animals` (`animal_uuid`),
  CONSTRAINT `FKqd1p3f5grusp1q7669spohl1t` FOREIGN KEY (`center_uuid`) REFERENCES `centers` (`center_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=1362 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lives`
--

LOCK TABLES `lives` WRITE;
/*!40000 ALTER TABLE `lives` DISABLE KEYS */;
INSERT INTO `lives` VALUES (8,'dd','d8ea4848-3925-440b-ac1a-ff0376363a47','빠빠보러 오세요','https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg',NULL),(123,'ff','d8ea4848-3925-440b-ac1a-ff0376363a47','피피의 하루','https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg',NULL),(456,'hh','d8ea4848-3925-440b-ac1a-ff0376363a47','햄찌파파','https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg',NULL),(789,'ss','d8ea4848-3925-440b-ac1a-ff0376363a47','빵빵이의 일상','https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg',NULL),(1234,'2b0c0289-af45-4584-8f51-a80079eb2e6d','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','삐뽀삐뽀','https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg','ses_H8lMnTUHzO'),(1252,'cf7e3cfd-6e8a-4638-86d3-51f3a3f5b7aa','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','달려라 리트',NULL,NULL);
/*!40000 ALTER TABLE `lives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points`
--

DROP TABLE IF EXISTS `points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points` (
  `point_amount` bigint DEFAULT NULL,
  `point_data_time` datetime(6) DEFAULT NULL,
  `point_id` bigint NOT NULL AUTO_INCREMENT,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`point_id`),
  KEY `FK8rj0an0g22a7s72y2i0hehjhl` (`user_uuid`),
  CONSTRAINT `FK8rj0an0g22a7s72y2i0hehjhl` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points`
--

LOCK TABLES `points` WRITE;
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
INSERT INTO `points` VALUES (-5000,'2023-08-13 09:51:05.490054',1,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-5000,'2023-08-13 09:51:06.721989',2,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-5000,'2023-08-13 09:51:18.047762',3,'341b223e-808c-4c2c-8592-b32fcf90b615'),(3330,'2023-08-13 14:20:08.252374',4,'341b223e-808c-4c2c-8592-b32fcf90b615'),(3330,'2023-08-13 14:20:13.012497',5,'341b223e-808c-4c2c-8592-b32fcf90b615'),(3330,'2023-08-13 14:20:32.487021',6,'341b223e-808c-4c2c-8592-b32fcf90b615'),(10,'2023-08-13 14:20:46.635496',7,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-3000,'2023-08-14 07:15:29.437761',8,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-3000,'2023-08-14 07:15:30.349985',9,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-14 07:16:14.930560',10,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-14 07:16:18.352820',11,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-14 07:16:20.126591',12,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-20000,'2023-08-14 07:16:23.194177',13,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-20000,'2023-08-14 07:16:23.722532',14,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-20000,'2023-08-14 07:16:23.937693',15,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-14 07:18:15.447639',16,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-20000,'2023-08-15 00:06:20.644763',17,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-15000,'2023-08-15 00:06:59.988281',18,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-15 00:24:31.084338',19,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-15 00:24:47.268771',20,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-15 00:26:27.032642',21,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-15 00:26:57.545256',22,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-15 00:26:59.545970',23,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-15 00:27:01.046011',24,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-5000,'2023-08-15 00:32:07.103312',25,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-5000,'2023-08-15 00:32:10.850716',26,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-5000,'2023-08-15 00:33:15.430389',27,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-15 03:55:42.740893',28,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-15 03:56:23.638679',29,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-15 07:11:37.306801',30,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-15 07:14:07.914959',31,'341b223e-808c-4c2c-8592-b32fcf90b615'),(0,'2023-08-15 07:25:16.516887',32,'3eccec9c-037d-4631-bd01-23dd022841e2'),(3000,'2023-08-16 04:43:01.124225',33,'341b223e-808c-4c2c-8592-b32fcf90b615'),(1000,'2023-08-16 04:53:21.227020',34,'341b223e-808c-4c2c-8592-b32fcf90b615'),(1000,'2023-08-16 04:53:27.509578',35,'341b223e-808c-4c2c-8592-b32fcf90b615'),(3000,'2023-08-16 04:53:55.336912',36,'341b223e-808c-4c2c-8592-b32fcf90b615'),(3000,'2023-08-16 04:54:04.028892',37,'341b223e-808c-4c2c-8592-b32fcf90b615'),(3000,'2023-08-16 04:54:11.773444',38,'341b223e-808c-4c2c-8592-b32fcf90b615'),(1000,'2023-08-16 04:54:24.630534',39,'341b223e-808c-4c2c-8592-b32fcf90b615'),(20000,'2023-08-16 04:54:37.100675',40,'341b223e-808c-4c2c-8592-b32fcf90b615'),(20000,'2023-08-16 04:55:18.385836',41,'341b223e-808c-4c2c-8592-b32fcf90b615'),(25000,'2023-08-16 05:08:26.444504',42,'341b223e-808c-4c2c-8592-b32fcf90b615'),(0,'2023-08-16 08:42:08.861304',43,'341b223e-808c-4c2c-8592-b32fcf90b615'),(0,'2023-08-16 08:42:22.200146',44,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-16 08:53:31.779537',45,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 15:00:11.404148',46,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:10:21.896732',47,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:10:58.695065',48,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:11:20.310722',49,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:11:39.943602',50,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:11:49.899394',51,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(0,'2023-08-16 16:12:06.766615',52,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:12:08.470732',53,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:12:13.523814',54,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:12:14.845834',55,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:12:28.449598',56,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-10000,'2023-08-16 16:12:39.388404',57,'64d77ebf-c35e-49f9-a6bd-c219da149fa1'),(-35000,'2023-08-16 20:48:35.503963',58,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-16 20:49:02.408663',59,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-16000,'2023-08-17 01:26:11.518995',60,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-16000,'2023-08-17 01:26:55.579015',61,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-16000,'2023-08-17 01:27:09.931006',62,'341b223e-808c-4c2c-8592-b32fcf90b615'),(0,'2023-08-17 02:26:24.191159',63,'3eccec9c-037d-4631-bd01-23dd022841e2'),(-11000,'2023-08-17 04:08:18.239360',64,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-10000,'2023-08-17 14:44:20.110269',66,'341b223e-808c-4c2c-8592-b32fcf90b615'),(-30000,'2023-08-17 14:44:32.913509',67,'341b223e-808c-4c2c-8592-b32fcf90b615'),(9000,'2023-08-17 16:03:57.081493',68,'26deff26-3b40-4324-9217-11e0e6441b05'),(0,'2023-08-17 16:13:03.808459',69,'341b223e-808c-4c2c-8592-b32fcf90b615'),(20000,'2023-08-17 17:00:25.695980',70,'341b223e-808c-4c2c-8592-b32fcf90b615'),(5000,'2023-08-17 17:03:18.034449',71,'341b223e-808c-4c2c-8592-b32fcf90b615'),(5000,'2023-08-17 17:05:53.300628',72,'89fd149f-c2e4-4bb1-8ece-69b465cb272d'),(20000,'2023-08-17 17:21:23.296107',73,'341b223e-808c-4c2c-8592-b32fcf90b615'),(20000,'2023-08-17 18:01:04.641193',74,'341b223e-808c-4c2c-8592-b32fcf90b615'),(15000,'2023-08-18 00:57:17.470068',75,'341b223e-808c-4c2c-8592-b32fcf90b615');
/*!40000 ALTER TABLE `points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `attendance` int NOT NULL,
  `mileage` bigint DEFAULT NULL,
  `donate_grade` enum('BRONZE','DIAMOND','GOLD','MASTER','PLATINUM','SILVER') DEFAULT NULL,
  `role_type` enum('CENTER','USER') DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_photo_url` varchar(255) DEFAULT NULL,
  `user_uuid` varchar(255) NOT NULL,
  `walk_grade` enum('BRONZE','DIAMOND','GOLD','MASTER','PLATINUM','SILVER') DEFAULT NULL,
  `last_login_date` date DEFAULT NULL,
  PRIMARY KEY (`user_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,0,'BRONZE','USER','email','user10','김채원','$2a$10$ZKYbVlTdjsxd3kl4osc4xOufo3PZ2JxgPw731PnJPR6qNGOa3UdiW','phone','','1752dad3-bc1e-42f7-ace1-a396287fa9e6','BRONZE','2023-08-14'),(0,59000,'BRONZE','USER','email','user4','홍은채','$2a$10$KuldLBnxO0VhzRt41OwyY.Ksytpp5g7PAMcv3VJSQJaJFfKQJnfZ2','phone','','26deff26-3b40-4324-9217-11e0e6441b05','BRONZE','2023-08-14'),(4,25000,'BRONZE','USER','testUser@ssafy.com','test_user','이도형','$2a$10$RR.dfw8xLprZ8xXhXJMBAev7XiDnLfFFSTOiGwOBfnXet5q0Fxp9.','01046049647','','341b223e-808c-4c2c-8592-b32fcf90b615','BRONZE','2023-08-18'),(4,0,'BRONZE','CENTER','test_center@ssafy.com','test_center','테스트보호소','$2a$10$EPZiDBCzp.jfkKT2cEQnr.g9OUJoP9qQ5HhwJ0G9E9fEpuMw4VRwq','phone','','3eccec9c-037d-4631-bd01-23dd022841e2','BRONZE','2023-08-18'),(3,0,'BRONZE','CENTER','email','center1','조유리','$2a$10$tsW3vfXsp55B7q8rd2iCku.zf7MUqTbfQZImSpcRqr3WWaAyjKUHa','phone','','57989a8c-bad7-4e03-aff2-aa668ffe3471','BRONZE','2023-08-18'),(0,0,'BRONZE','CENTER','email','center2','히토미','$2a$10$fS/l3aMxGG7W7gwPNNJiRevhdX4ElHL1NHxMyg2GRb5E.gdmNkdbe','phone','','63fd90af-496d-428f-9126-a67aba5726ca','BRONZE','2023-08-14'),(4,0,'BRONZE','USER','email','user1','미야와키 사쿠라','$2a$10$D1PkpPB6N9j2PY9jEaweVOw1OBbaZn/LLGJ8AwM0mJrFMwE5CQAHC','phone','','64d77ebf-c35e-49f9-a6bd-c219da149fa1','BRONZE','2023-08-18'),(0,0,'BRONZE','USER','aaa','aaa','최예나','$2a$10$VZvcwYWe4SBAOda2FF14r.pv0NOOnrH3tgQQiOQytnsJp8fT2gMfa','aaa','','6ab28638-0c22-415f-886f-9a24e09a8dca','BRONZE','2023-08-16'),(0,40000,'BRONZE','USER','qkrguswns25@naver.com','dodo','나코','$2a$10$mbOL7HJcjx8pQNFJaCPYs.GNvv9cpaPgUx8BzpwlcXB5zfCYar.bS','phone','','87510718-2aa3-449e-9f5d-64b50547ef4a','BRONZE','2023-08-14'),(4,5000,'BRONZE','USER','2','mm','권은비','$2a$10$J9J22KM0KPHsxYtpzuqjjemV1k2FvhT4ksKOJXxznjS.TuTvONV5e','2','','89fd149f-c2e4-4bb1-8ece-69b465cb272d','BRONZE','2023-08-18'),(0,0,'BRONZE','USER','1234','gggg','김민주','$2a$10$qdsafOsYUAyZA05amdwAvOu6fmD9PxSVfCJRHsunffO5mU3.85evG','1234','','8b7ab31a-dbab-4b33-aa53-50477338bc5d','BRONZE','2023-08-14'),(3,0,'BRONZE','USER','email','asdasdasd','가을','$2a$10$dTEMry1QZGZNlgTZfidBU.OdjdW/DDN7XrNR9g/3BYz1XwEZPKSHG','phone','','92bf06f7-464f-4149-86d2-2951c87b303d','BRONZE','2023-08-18'),(0,0,'BRONZE','CENTER','email','center3','레이','$2a$10$/1vFQANKwWaNxpHEPQNZke7KCyyNN5Fxys/h8zW53OWty63n7PGiG','phone','','9ac6ad4f-04b3-4e39-b4c0-8badc1c37f22','BRONZE','2023-08-14'),(1,0,'BRONZE','CENTER','1','cc','강혜원','$2a$10$5CIvDESeEVV2/ADit0u4K.Rf1NyagwsGAZ1s8h2gzw5.kGIpKlNUi','1','','ac9a0869-60fc-4d73-a6f4-015a061aa7d7','BRONZE','2023-08-15'),(2,0,'BRONZE','USER','1234','1234','장원영','$2a$10$7vlcbb4KjyVblqu.iBpGOuelEUif6R6SoLewYxNzHOKdZEtTqjx1S','111','','b519fd74-ce48-443c-b6da-68e697af8156','BRONZE','2023-08-17'),(0,0,'BRONZE','USER','qwer','qwer','리즈','$2a$10$s3JO56/ijkZgDlzv0c2Zw.WzipFkYQMU4esQ29KEBgpr4774DMoDe','qwer','','b830ee9c-3a10-4d88-9a34-82de417177ee','BRONZE','2023-08-16'),(1,0,'BRONZE','USER','email','user2','태연','$2a$10$KYPxb4eHnM6GUg4khzFvuO/btXzd/1sLHIoPSaNVII/KykFYaBI2G','phone','','d168f2fb-16a3-412d-b3d9-efafafc32f0d','BRONZE','2023-08-15'),(0,0,'BRONZE','USER','email','asdasdasdd','유리','$2a$10$yUvgVyi08qDoakQW0zGrKuB8HAfMBGC.Kzvfw2Cz/BgnQHnkzikIq','phone','','dc9309a6-f763-4cef-8c85-31bf603db32f','BRONZE','2023-08-14'),(0,0,'BRONZE','USER','1','ss','안유진','$2a$10$ne7RZ9eEYRvHM/Zq.VtygOTuE95I4aVpbB5Hl95YrR1X23w5Wl1Ve','1','','eff502a1-3762-4c97-84af-dd4521c38343','BRONZE','2023-08-14'),(0,0,'BRONZE','USER','email','user3','윤아','$2a$10$hJ4qO06ihZP6bI1f2ocQpuuXUihimXc9s9OhJRu6nFoQpLxfBqlTm','phone','','f92bf5df-1a18-4f55-8019-8db8a50e0ab3','BRONZE','2023-08-14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walk`
--

DROP TABLE IF EXISTS `walk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `walk` (
  `date` date DEFAULT NULL,
  `time` int NOT NULL,
  `walk_id` bigint NOT NULL AUTO_INCREMENT,
  `animal_uuid` varchar(255) DEFAULT NULL,
  `center_uuid` varchar(255) DEFAULT NULL,
  `status` enum('APPROVAL','PENDING','REJECTION') DEFAULT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`walk_id`),
  KEY `FKo4rthmkggg0w7813hg0xtrx86` (`animal_uuid`),
  KEY `FKjh2y9n20o5phj1wfwghgjn7mr` (`center_uuid`),
  KEY `FKpgwf8rohqeynr9lvvlg2sgjh` (`user_uuid`),
  CONSTRAINT `FKjh2y9n20o5phj1wfwghgjn7mr` FOREIGN KEY (`center_uuid`) REFERENCES `centers` (`center_uuid`),
  CONSTRAINT `FKo4rthmkggg0w7813hg0xtrx86` FOREIGN KEY (`animal_uuid`) REFERENCES `animals` (`animal_uuid`),
  CONSTRAINT `FKpgwf8rohqeynr9lvvlg2sgjh` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`user_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walk`
--

LOCK TABLES `walk` WRITE;
/*!40000 ALTER TABLE `walk` DISABLE KEYS */;
INSERT INTO `walk` VALUES ('2023-07-31',1,1,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','APPROVAL','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),('2023-07-31',2,2,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','PENDING','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),('2023-07-31',4,3,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','PENDING','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),('2023-08-01',4,4,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','APPROVAL','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),('2023-08-02',4,5,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','PENDING','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),('2023-08-03',4,6,'f98deb84-5e11-4e9a-a50a-54cd0fd13492','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','APPROVAL','64d77ebf-c35e-49f9-a6bd-c219da149fa1'),('2023-08-17',10,7,'48f9adb0-6ef8-4821-8284-dd0f7a9c8c50','0e2e4c27-f843-4340-9f4c-d686bdaf4e65','REJECTION','341b223e-808c-4c2c-8592-b32fcf90b615'),('2023-08-17',10,8,'2b0c0289-af45-4584-8f51-a80079eb2e6d','26ebf26f-c289-44a7-93a7-7a77233f8af2','PENDING','341b223e-808c-4c2c-8592-b32fcf90b615'),('2023-08-27',23,15,'3f04de3b-941d-4ed2-8a08-552107ec1e2e','26ebf26f-c289-44a7-93a7-7a77233f8af2','PENDING','341b223e-808c-4c2c-8592-b32fcf90b615'),('2023-08-26',23,16,'4eede345-3533-42db-896d-817c3beb62c1','26ebf26f-c289-44a7-93a7-7a77233f8af2','PENDING','341b223e-808c-4c2c-8592-b32fcf90b615'),('2023-09-13',23,17,'4eede345-3533-42db-896d-817c3beb62c1','26ebf26f-c289-44a7-93a7-7a77233f8af2','PENDING','341b223e-808c-4c2c-8592-b32fcf90b615'),('2023-11-11',3,18,'3f04de3b-941d-4ed2-8a08-552107ec1e2e','26ebf26f-c289-44a7-93a7-7a77233f8af2','PENDING','341b223e-808c-4c2c-8592-b32fcf90b615');
/*!40000 ALTER TABLE `walk` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:57:30
