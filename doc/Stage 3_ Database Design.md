# Stage 3: Database Design
Team016 Sounds Like Shrimp
> Leader: **cfyang2**
> Team Members: chkuo2,cmlin2,vfchen2

## :memo: Project Title: Chivago

### Database Implementation
#### Connection
![](https://i.imgur.com/LTxDSta.png)


#### Table Creation:
Currently, we created four tables. Other tables will be created in the following stages.
```sql
CREATE TABLE User(
    email       VARCHAR(255) PRIMARY KEY,
    name        VARCHAR(255),
    password    VARCHAR(255) NOT NULL,
    phone       VARCHAR(255),
    membership  INT CHECK(membership <= 5 AND membership >= 1)
);

CREATE TABLE Room(
    room_number     INT PRIMARY KEY,
    accomodation    INT NOT NULL,
    price           INT NOT NULL,
    feature         INT CHECK(feature <= 10 AND feature >= 1)
);

CREATE TABLE Reservation(
    reservation_id  INT,
    email           VARCHAR(255),
    room_number     INT,
    checkin_year    INT,
    checkin_month   INT,
    checkin_date    INT,
    checkout_year   INT,
    checkout_month  INT,
    checkout_date   INT,
    duration        INT,

    FOREIGN KEY(email) REFERENCES User(email) ON UPDATE CASCADE,
    FOREIGN KEY(room_number) REFERENCES Room(room_number) ON UPDATE CASCADE,
    CONSTRAINT PRIMARY KEY(reservation_id, email, room_number)
);

CREATE TABLE Service(
    service_id  INT PRIMARY KEY,
    price       INT NOT NULL,
    type        INT CHECK(type >= 1)
)
```
#### Inserted Data and Demo
```sql
SELECT COUNT(*) AS instances FROM User;
SELECT COUNT(*) AS instances FROM Room;
SELECT COUNT(*) AS instances FROM Reservation;
-- Service has only 10 instances
SELECT * FROM Service;
```

All data in the tables are generated according to the schema.
The results of the queries are shown in the following picture.

![](https://i.imgur.com/Cyp5m1u.png)



### Advanced Queries

#### Query1: Calculate Revenue in Specific Month/Year
```sql
SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue 
FROM Reservation res JOIN Room rm USING(room_number)
GROUP BY res.checkin_month
ORDER BY res.checkin_month
```
![](https://i.imgur.com/Z8DhsYx.png)


#### Query2: Analyze Popular Features Regarding Specific Price Range
```sql
SELECT rm.feature, COUNT(res.reservation_id) AS popularity
FROM Reservation res JOIN Room rm USING(room_number)
-- 180 and 100 can be modified
WHERE rm.price <= 180 AND rm.price >= 100
GROUP BY rm.feature
ORDER BY rm.feature
```
![](https://i.imgur.com/sdJJlmq.png)


### Index Analysis
In all, most of the indices that we added did not improve the performance. Our assumption is that in order to improve the query performance, we need to add the unique attribute as our index. In our case this is already the default attribute: **room_number**. In other words, the default index already gave us the optimal performance.

When using **checkin_month** as our index, the performance decreases. We assume that this is because indexing on grouped by attributes is similar to hashing. There are only 12 keys as for 12 months, and for every key there may be 100 records on average. Thus decreasing the performance.

Futhermore, assume that the block size is 100 and we have 12 blocks. When we are using group by functions we still need to read all of the blocks to be able to access all the target records. This approach will not improve our performance if the target only exist 1 record in each block .

Last but not least, we assume that the size of our dataset also plays a critical role. Since the size of our dataset is not that big, the performance difference is very small and cannot be seen by our analysis on advanced queries.

Query 1:
![](https://i.imgur.com/JhsH9Od.png)

1. feature
![](https://i.imgur.com/DKvXJh3.png)


2. price (Aggregation)
![](https://i.imgur.com/9CKF87z.png)


3. checkin_month (group by)
![](https://i.imgur.com/tjxHhAC.png)



Query 2:
![](https://i.imgur.com/K4Ff7Q4.png)

1. duration
![](https://i.imgur.com/OyDYaKf.png)



2. price (Search)
![](https://i.imgur.com/fDMHGzs.png)


3. feature (group by)
![](https://i.imgur.com/NGzeh5K.png)

