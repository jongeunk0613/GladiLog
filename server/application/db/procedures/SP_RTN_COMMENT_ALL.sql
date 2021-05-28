DELIMITER $$

CREATE PROCEDURE GetComments(IN IN_POST_ID INT(11))
BEGIN
    SELECT TB_COMMENT.*, TB_USER.USERNAME
    FROM TB_COMMENT
    INNER JOIN TB_USER ON TB_COMMENT.AUTHOR_ID=TB_USER.ID
    WHERE TB_COMMENT.DELETED IS NULL AND TB_COMMENT.POST_ID=IN_POST_ID
    ORDER BY TB_COMMENT.CREATED DESC;
END $$

DELIMITER ;