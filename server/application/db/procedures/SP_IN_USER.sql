DELIMITER $$

CREATE PROCEDURE CreateUser(IN EMAIL VARCHAR(100), IN USERNAME VARCHAR(64), IN PASSWORD_HASH VARCHAR(128))
BEGIN
	INSERT INTO 
		TB_USER(EMAIL, USERNAME, PASSWORD_HASH)
	VALUES
		(EMAIL, USERNAME, PASSWORD_HASH);
END $$

DELIMITER ;


