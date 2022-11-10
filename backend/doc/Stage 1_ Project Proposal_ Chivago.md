# Stage 1: Project Proposal: Chivago 
> Project Description for Team016 Sounds Like Shrimp
> Leader: **cfyang2**
> Team Members: chkuo2,cmlin2,vfchen2

## :memo: Project Title: Chivago

### Project Summary

Our system aims to manage hotel services at both customer’s level and the hotel ownership’s level. For customer level, our system allows customers to register in the system to book reservations for the hotel. Also, we will introduce a membership program for subscribed users to get discounts for different room types. For reservations, our system will ask the customers from basic descriptions of the check in/out dates and the number of travelers to specific room service requests. Also, we provide a special shuttle bus/chauffeur management system for customers to book bus seats or private sedans for airport pickup or sightseeing.

As for hotel ownership’s level, we would receive the specific requests from the user reservations and shuttle bus bookings. With this data confirmed by the reservations, we can apply scheduling algorithms for the hotel to assign the number of cleaning ladies, bus drivers, and other employees to work on specific dates. In sum, we propose to merge these two levels in a single system for hotels to manage more effectively.


### Description of Chivago and Motivation

  The workload and customers hotels recieve are often based on different holidays or summer and winter breaks. On normal weekdays, hotels may not need their full workforce to be in person. This would cause many employees to become idle, hence causing hotels to spend unnecessary expenses on human resources. With our management system, we can forecast the future workforce needs for hotels based on our data. Hence, scheduling the specific number of employees that need to be working on specific days. With this proposal, hotels can manage more effectively and profit more.



### Functionality of Chivago
- BookReservation: We want our customers to be able to book a room, and we will provide several options for the customers ranging from the check in/ check out date, accommodation, and room type( e.g. normal, luxury, etc.)
- Subscribe: We provide our customers the option to subscribe to our Chivago Premium™ to get the latest and sweetest deal, ranging from best room price to free room services.
- RoomService: Our customers can call room services and we will schedule our workers using the scheduling algorithm to achieve it.
- NumCleaner: We can get the number of cleaners for any specific day by our scheduling algorithm. From the management perspective, we can predict the number of cleaners we need each day by the booking situation, thus cutting down the cost of human resources.



### Usefulness
There are several key components in our application that are useful in the real world scenario.
- Reservation management: In the reservation database, the admins are able to check the availability of each room according to different types of the rooms, and offer promotion via the membership.
- Service management: The service database will provide all the service information that the hotel provided. The admin can easily schedule the human resources according to the time, and report the availability.
- HR management: We integrate our management database with HR database to keep all interactions with employees under control. Among all the benefits are task management and time-scheduling. The manager of the hotel can assign tasks and track the completion of tasks in the system. In this way, it saves a lot of time for human resources distribution.


### Realness
We will randomly generate the data we need to perform the analysis. The reason that we can not obtain the real world dataset is that the data we used contains a lot of private information. For example, credit card number, password. So for the safety concern, it is better for us to randomly generate the data we need.

### Functionality Description of Chivago
From the website's homepage, users can choose logging in with their email and password or creating a user account. Log in function will search from the user table to find the matched email and password. If the users choose to create an account, the API will interact with the database to insert a new instance into the user table.

After logging into the system, access to the accounts varies based on the membership level. The rudimentary users can only make reservations with the number of travelers and the time they stay. Reservation will obtain more advanced and complicated options, such as room preferences, shuttle bus reservations, and additional room services, as the membership level increases. With different options chosen, the system will perform various operations. For instance, the users with room preferences will primarily be assigned preferred rooms if rooms are remaining. Each operation will be based on the result of the required search in the database. Due to the high reliability between membership level and the account access level, the system provides the option of subscription to promote membership level. After the subscription, the system will automatically update the database.

For executives or managers, they will have the highest membership level, which implies their identity.They can perform operations related to the whole database. For example, the managers can see all reservations to know the details of each record. With full access to the database, the user can modify the system for specific purposes, such as changing the price of an arbitrary type of rooms to achieve more revenue.

### UI Mockup of Chivago
#### Login Page
![Login Page](https://i.imgur.com/GZy0xWS.jpg)
#### Main Page
![User Main Page](https://i.imgur.com/xEoYiME.jpg)
#### Reservation Page
![Reservation Page](https://i.imgur.com/gkvCRwu.jpg)
#### Detail Page
![Details](https://i.imgur.com/B6sZIZb.jpg)


### Project Distribution

#### Database internal operations 
Based on the requests from API, do corresponding operations, such as searching desired data or CRUD operations, on databases.
> Responsibility: Frank (cfyang2)
#### Test data generation
Automatic generate data in the database.
> Responsibility: Vincent (vfchen2), Edwin (chkuo2)
#### System control flow
Authentication, authorization, access
> Responsibility: Jimmy (cmlin2)
#### Backend API
Respond to the frontend request and give corresponding response based on the API endpoints and authentication.
> Responsibility: Jimmy (cmlin2), Edwin (chkuo2)
#### Frontend design
UI design and connection between UI and backend
> Responsibility: Frank (cfyang2), Vincent (vfchen2)




