DELIMITER $$

CREATE PROCEDURE UpdateComment(IN IN_ID INT(11), IN IN_BODY TEXT)
BEGIN
	UPDATE TB_COMMENT
    SET BODY=IN_BODY
	WHERE ID=IN_ID;
END $$

DELIMITER ;


