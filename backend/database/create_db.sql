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
    checkin         DATE,
    checkout        DATE,
    duration        INT,

    FOREIGN KEY(email) REFERENCES User(email) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(room_number) REFERENCES Room(room_number) ON UPDATE CASCADE,
    CONSTRAINT PRIMARY KEY(reservation_id, email, room_number)
);

CREATE TABLE Service(
    service_id  INT PRIMARY KEY,
    price       INT NOT NULL,
    type        INT CHECK(type >= 1)
);

-- Mobiles foreign key emp_id cannot be NULL, but Employee foreign key mob_id can --
CREATE TABLE Employee(
    emp_id      INT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    salary      INT NOT NULL,
    mob_id      INT
);

CREATE TABLE Mobiles(
    mob_id          INT PRIMARY KEY,
    type            INT,
    emp_id          INT NOT NULL,
    accomodation    INT NOT NULL,

    FOREIGN KEY(emp_id) REFERENCES Employee(emp_id) ON UPDATE CASCADE
);

CREATE TABLE Charter(
    chater_id       INT,
    mob_id          INT,
    email           VARCHAR(255),
    destination     VARCHAR(255),
    rent_date_time       DATE NOT NULL,

    FOREIGN KEY(mob_id) REFERENCES Mobiles(mob_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(email) REFERENCES User(email) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PRIMARY KEY(chater_id, mob_id, email)
);

CREATE TABLE Request(
    time            TIME,
    room_number     INT REFERENCES Room(room_number)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
    service_id      INT REFERENCES Service(service_id)
                    ON UPDATE CASCADE,

    CONSTRAINT PRIMARY KEY(time, room_number, service_id)
)
