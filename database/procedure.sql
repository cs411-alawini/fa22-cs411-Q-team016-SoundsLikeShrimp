DELIMITER //
CREATE PROCEDURE Result(
    IN roomPriceMin INT,
    IN roomPriceMax INT
)
BEGIN

DECLARE varRevenue INT;
DECLARE varCheckin_month INT;
DECLARE varFeature INT;
DECLARE varPopularity INT;
DECLARE varRoom_number INT;

DECLARE exit_loop BOOLEAN DEFAULT FALSE;
DECLARE exit_loop1 BOOLEAN DEFAULT FALSE;

DECLARE cur CURSOR FOR (
    SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue 
    FROM Reservation res JOIN Room rm USING(room_number)
    GROUP BY res.checkin_month
    ORDER BY res.checkin_month
);

DECLARE cur1 CURSOR FOR (
    SELECT rm.feature, COUNT(res.reservation_id) AS popularity
    FROM Reservation res JOIN Room rm USING(room_number)
    WHERE rm.price <= roomPriceMax AND rm.price >= roomPriceMin
    GROUP BY rm.feature
    ORDER BY rm.feature
);

DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
SET @discount = 0;
OPEN cur;
cloop: LOOP
    FETCH cur INTO varCheckin_month,varRevenue;
    
    IF (exit_loop) THEN
        LEAVE cloop;
    END IF;
    
    IF (varRevenue < 100000) THEN
        SET @discount = 10;
        SET exit_loop1 = TRUE;
    END IF;
    
    
    END LOOP cloop;
    CLOSE cur;

UPDATE Room rm
SET rm.price = rm.price * (100 - @discount) / 100;

OPEN cur1;
cloop1: LOOP
    FETCH cur1 INTO varFeature,varPopularity;
    
    IF (exit_loop1) THEN
        LEAVE cloop1;
    END IF;
    
    IF (popularity < 12) THEN
        SET @discount = 10;
    END IF;
    
    UPDATE Room rm
    SET rm.price = rm.price * (100 - @discount) / 100
    WHERE rm.feature = varFeature;
    
    END LOOP cloop1;
    CLOSE cur1;

END