DELIMITER $$

CREATE PROCEDURE GetComment(IN IN_ID INT(11))
BEGIN
    SELECT TB_COMMENT.*, TB_USER.USERNAME
    FROM TB_COMMENT
    INNER JOIN TB_USER ON TB_COMMENT.AUTHOR_ID=TB_USER.ID
    WHERE TB_COMMENT.ID=IN_ID;
END $$

DELIMITER ;