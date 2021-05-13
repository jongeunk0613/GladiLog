DELIMITER $$

CREATE PROCEDURE GetUserWithUsername(IN IN_USERNAME VARCHAR(64))
BEGIN
    SELECT *
    FROM TB_USER
    WHERE USERNAME=IN_USERNAME;
END $$

DELIMITER ;