DELIMITER $$

CREATE PROCEDURE UpdatePost(IN IN_ID INT(11), IN IN_TITLE TEXT, IN IN_BODY TEXT)
BEGIN
	UPDATE TB_POST
    SET TITLE=IN_TITLE, BODY=IN_BODY
	WHERE ID=IN_ID;
END $$

DELIMITER ;


