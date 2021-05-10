CREATE TABLE `TB_VISIT`(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `VISITED` DATETIME NOT NULL DEFAULT NOW(),
    `BROWSER` ENUM('CHROME', 'FIREFOX', 'SAFARI', 'OPERA', 'ETC') DEFAULT 'ETC',
    `DEVICE` ENUM('PC', 'MOBILE', 'ETC') DEFAULT 'ETC',
    `USER_ID` INT NOT NULL,
    `POST_ID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`USER_ID`) REFERENCES `TB_USER`(`ID`),
    FOREIGN KEY (`POST_ID`) REFERENCES `TB_POST`(`ID`)
)