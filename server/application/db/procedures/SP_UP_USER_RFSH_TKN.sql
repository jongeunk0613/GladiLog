DELIMITER $$

CREATE PROCEDURE UpdateUserRefreshToken(IN IN_USERNAME VARCHAR(64), IN IN_REFRESH_TOKEN LONGTEXT)
BEGIN
	UPDATE TB_USER
    SET REFRESH_TOKEN=IN_REFRESH_TOKEN
	WHERE USERNAME=IN_USERNAME;
END $$

DELIMITER ;


