# Stage 2: Conceptual and Logical Database Design
> Relational Schema for Team016 Sounds Like Shrimp
> Leader: **cfyang2**
> Team Members: chkuo2,cmlin2,vfchen2

## :memo: Project Title: Chivago

### Relational Schema:


User (email: VARCHAR(255) [PK], name:VARCHAR(255), password:VARCHAR(255), phone: VARCHAR(255), membership: INT)

> Cardinality:
> - Reservation (User-Room: many to many)
> - Charter (User-Mobile: many to many)
> 
> Description:\
> As many mordern user management systems, we set the **email** as the primary key to ensure that every account is unique. Besides the primary key, our User table stores the information that is useful for the real world application.


Reservation (reservation_id: INT [PK], email: VARCHAR(255) [PK] [FK to User.email], room_number: INT [PK] [FK to Room.room_number], checkin_year: INT, checkin_month: INT, checkin_date: INT, checkout_year: INT, checkout_month: INT, checkout_date: INT, duration: INT)

> Description: \
> A reservation is made by a user and the user will be assigned a room if available. Reservation table takes **reservation_id**, **email**, and **room_number** as the primary key. With this design, the reservation_id increases slowly because it will increase from 1 for every distinct combination of users and rooms. **duration** records the number of days the customers live.

Room (room_number: INT [PK], accomodation: INT, price: INT, feature: INT)
> Cardinality:
> - Reservation (Room-User: many to many)
> - Request (Room-Service: many to many)
> 
> Description: \
> Each room acquires a unique **room_number** as the primary key. The **accomodation** column will provide details of the number of persons each room can contain. **Features** of the room will correspond to differnt aspects including suites, luxury rooms, rooms with mountain or ocean views etc. **Prices** will be given according to the aspects illustrated above.

Service(service_id: INT [PK], price: INT, type: INT)
> Cardinality:
> - Request (Service-Room: many to many)
>
> Description: \
> Each service will have a unique **service_id** as primary key to differentiate between different services. There will also be several **types** of room services including room cleaning, beverages, and snacks etc. Also with different room services, different fees will be charged with the given **price** attribute. 

Employee (emp_id: INT [PK], salary: INT, title: VARCHAR(255))
> Cardinality:
> - Drive (Employee-Mobiles: One to One)
>
> Description: \
> Each employee will have a unique **imp_id** as the primary key to differentiate between employees. There will also be **salary** denoting their salary, and **title** to correctly address them.

Mobiles (emp_id: INT [PK] [FK to Employee.emp_id], id: INT [PK], type: INT, accommodation: INT)
> Cardinality:
> - Drive (Mobiles-Employee: One to One)
> - Charter (Mobiles-User: Many to Many)
>
> Description: \
> Mobiles is a weak entity, it needs employee to uniquely identify. Each mobile will be assigned to exactly 1 employee, and each employee will be assigned to at most 1 mobile. So to uniquely identify mobiles, we need **emp_id** and it's own **id**. The **type** of mobile denotes which mobile it is, like bus or taxi. The **accommodation** denotes the number of passenger it can have.

Charter (charter_id: INT [PK], mobile_id: INT [PK] [FK to Mobiles.id], email: VARCHAR(255) [PK] [FK to User.email], date: DATE, beginning: TIME, destination: VARCHAR(255), price: INT)
> Description: \
> Charter has a unique **charter_id** to identify each charter. Each charter will be assigned to a **mobile_id**, and multiple user (**email**) can ride in this charter. User can plan their plan using the **date**, **beginning**, and **destination** attribute. It also has a **price** attribute to denote the price of that charter.

Request(time: TIME [PK], room_number: INT [PK] [FK to Room.room_number], service_id: INT [PK] [FK to Service.service_id])
> Description: \
> Each type of request will be identified by the combination of **room_number** and **time** that is requested. With these two information we can roughly categorized the service such as house keeping, room service... and each request will be assigned an unique timestamp **time** to avoid conflicts. At the same time, **time** attribute also stores the information about the request date in addtion to time.
### ER Diagram:


![er img](https://i.imgur.com/vZ3hnic.png)

