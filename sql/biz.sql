/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : biz

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-06-24 23:18:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES ('1', 'qwe');

CREATE TABLE IF NOT EXISTS `news`(
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT '新闻主键',
  `language` CHAR(8) NOT NULL DEFAULT 'en' COMMENT '语言',
  `title` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '新闻标题',
  `draft` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '新闻摘要',
  `text` TEXT NOT NULL COMMENT '新闻正文',
  `time` TIMESTAMP NOT NULL DEFAULT current_timestamp COMMENT '发布时间',
  `home` CHAR NOT NULL DEFAULT '0' COMMENT '是否在首页显示 ,0:不显示  1：首页显示',
  `comment` VARCHAR(300) DEFAULT '' COMMENT '备注'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '新闻表';
