-- Create project database --
DROP DATABASE IF EXISTS hotel;
CREATE DATABASE hotel;
USE hotel;


-- Create tables --
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
