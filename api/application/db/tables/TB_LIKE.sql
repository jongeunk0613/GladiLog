CREATE TABLE `TB_LIKE`(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `USER_ID` INT NOT NULL,
    `POST_ID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`USER_ID`) REFERENCES `TB_USER`(`ID`),
    FOREIGN KEY (`POST_ID`) REFERENCES `TB_POST`(`ID`)
)