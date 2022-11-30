DELIMITER //
CREATE TRIGGER trig
AFTER INSERT ON Reservation FOR EACH ROW
BEGIN
    
    SET @user_email = (SELECT u.email
            FROM User u
            WHERE u.email = new.email);
	SET @user_membership = (SELECT u.membership
            FROM User u
            WHERE u.email = new.email);
	IF (SELECT COUNT(r.reservation_id) as cnt
        FROM User u NATURAL JOIN Reservation r
        WHERE u.email = @user_email
        GROUP BY u.email
		HAVING cnt = 2 or cnt = 6 or cnt = 4) THEN
		SET @user_membership = @user_membership + 1;		
	END IF;
	UPDATE User u
	SET u.membership = @user_membership
    WHERE @user_email = u.email;	
END;


-- 0~1 : level 1
-- 2~3 : level 2
-- 4~5:  level 3
-- 6~7:  level 4
-- new.count = old.count + 1 and new.count = 2 or 4 or 6 , then + 1