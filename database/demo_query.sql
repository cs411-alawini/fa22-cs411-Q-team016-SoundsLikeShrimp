USE hotel;

-- Show
SELECT COUNT(*) AS instances FROM User;
SELECT COUNT(*) AS instances FROM Room;
SELECT COUNT(*) AS instances FROM Reservation;
SELECT * FROM Service;


-- Advanced query
SELECT rm.feature, COUNT(res.reservation_id) AS popularity
FROM Reservation res JOIN Room rm USING(room_number)
-- 180 and 100 can be modified
WHERE rm.price <= 180 AND rm.price >= 100
GROUP BY rm.feature
ORDER BY rm.feature;

SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue 
FROM Reservation res JOIN Room rm USING(room_number)
GROUP BY res.checkin_month
ORDER BY res.checkin_month;

DELETE FROM Reservation;




