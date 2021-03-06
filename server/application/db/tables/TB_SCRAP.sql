CREATE TABLE `TB_SCRAP`(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `SCRAPPED` DATETIME NOT NULL DEFAULT NOW(),
    `USER_ID` INT NOT NULL,
    `POST_ID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`USER_ID`) REFERENCES `TB_USER`(`ID`),
    FOREIGN KEY (`POST_ID`) REFERENCES `TB_POST`(`ID`)
)