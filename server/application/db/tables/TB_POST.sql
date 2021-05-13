CREATE TABLE `TB_POST` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `TITLE` VARCHAR(150),
    `BODY` TEXT,
    `CREATED` DATETIME NOT NULL DEFAULT NOW(),
    `DELETED` DATETIME,
    `AUTHOR_ID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`AUTHOR_ID`) REFERENCES `TB_USER`(`ID`)
)