# Demo video link
[demo video](https://drive.google.com/file/d/185XAUjTCsNknHx9IRd_T6ml3yJdUolZE/view?usp=sharing)

# Difference from Original Proposal
`The rudimentary users can only make reservations with the number of travelers and the time they stay.` After thorough consideration, we decided to drop this feature because this is not suitable to categorize customers and limit their options based on membership.
As proposed, the user can unlock more features such as room preference selection, shuttle bus reservation and additional room services as their membership increases. We then decided to open our services to all customers.
The functionality of `membership` will be used as the reference for discount in the future work.
To sum up, we deprecated the feature of `membership` along with its recommendation functionality.
Except for this, we've matched all the features from the proposal.

# Usefulness evaluation 

## Reservation management: 
In the reservation database, the admins are able to check the availability of each room according to different types of the rooms, and offer promotion via the membership.

We've accomplished this application. The admin can easily check the revenue by clicking the `check revenue`.

## Service management: 
The service database will provide all the service information that the hotel provided. The admin can easily schedule the human resources according to the time, and report the availability.

We partially accomplished this application. The customer can request a service during their stay. However, we failed to calculate how many human resources each service needs.  The admin still can list out how many services are requested per day and can allocate the human resource manually by checking our service table.

## HR management: 
We integrate our management database with HR database to keep all interactions with employees under control. Among all the benefits are task management and time-scheduling. The manager of the hotel can assign tasks and track the completion of tasks in the system. In this way, it saves a lot of time for human resources distribution.

# Alternation in Schema
We change the data type of date in the `Reservation` table from `INT` to `DATE` so that we can calculate the available room from the user given check_in date and check_out date.

# ER diagram Modification 
We did not change the ER diagram, it is the same as the proposal.

# Newly Added Functionality (Creative Component)
Functionalities we newly added are listed below 
- `check salary`: The admin can observe the total employees salary that month for revenue calculation.
- `change price`: If the revenue is less than a certain value, the admin can hold a promotion, all room prices will have a 10% off discount.
- `hire`: The admin can hire a new employee by providing `employee_id`,`employee_title`,`mobile_id`,`salary`. The data will be inserted into `Employee` table for future human resource management.
- `layoff`: The admin can lay off a certain employee using provided `employee_id`. The data will be deleted from the `Employee` table for human resource management.

# Advanced Query Usefulness
- Our advanced query is used in these two functionalities: `check_revenue`,`check_feature`
-  `check_revenue`: This will calculate and return the revenue in a specific month/year. With this information the admin will have useful information rather than a bunch of data. This application can be very helpful in the real world scenario.
- `check_feature`: This will analyze popular features regarding specific price ranges. With this functionality, the admin can obtain information like what is the most popular feature among the room.Based on this information, the admin can distribute the quantity of the room for the best profit purpose, which is very useful in the real world situation. 
# Achieved or Failed
- [x] The customer can book a room after successfully registering on our website.
- [x] The customer can make a request to the service they want during their stay.
- [x] The membership will be upgraded as the number of reservations of the customer increases.
- [x] The admin can see the revenue per month which is composed of every room that is booked and multiply its price from our system directly.
- [x] The admin can promote a price discount whenever they feel like it in our system.
- [x] The admin can directly hire a person, the id will be auto added into our database system to save the redundant paperwork.
- [x] The admin can layoff people with the provided employee id in our system
- ❌ Fully functional membership mechanism
- ❌ Customized membership base preference recommendation
- ❌ Deal notification system
- ❌ Detailed Human Resource management system that support real-time resource prearrangement and optimized work distribution.
# Technical Challenge 
- cmlin2: This is my first time using node.js to develop a project. At First, I was confused by the different modules between CommonJS and ES modules. What's worse, my teammate and I chose the different module at the early stage, luckily after discussion we decided to go with CommonJS since it is more convenient for us to interact with SQL. During the merge/transform there are a lot of incompatible components that need to be resolved. The process is hard but the result is great.
- chkuo2: Working on the frontend is very hard for me because this is the first time I used Javascript. I have no idea how this language works, as well as those libraries. Using React's effect hooks are very challenge to me as well. Thankfully, cfyang2 (Frank Yang) has taught me a lot about frontend, and he did the majority of the frontend, while I support him debugging and give him ideas. I also worked on a little bit of backend (stored procedure), which I feel like more simple and straight forward.
- cfyang2: I'm appreciated that I have this opportunity to make plan of the whole project. I have few experiences in designing the application, which made us need to discuss the feasibility of the design many times during the development. It is hard to predict the possible difficulties in implementation at the design stage. Besides the design, we have little understanding in authentication, which forces us to keep fetching user information from the server. If we have sufficient knowledge in authentication, our application design would be more concise.
- vfchen2: As a newbee to full stack web development, it took some time for me to get familiar with the APIs and language framework. Although we had lots of practice in MySQL during class, we still had some difficulty merging it to our website. While implmenting the database system, I feel that the rubric is limiting our ideas to the full website. For example, the stored procedures are inflexible for a database system and there might be our methods to cover up for it. Despite these obstacles, our group still cooperated flawlessly and completed the project thanks to the help of the TAs.
# Teamwork Distribution
- cmlin2:Backend API(Node.js), Database Internal Operations (MySQL)
- chkuo2:Frontend API(JavaScript, React), Stored Procedure operations (MySQL)
- cfyang2: Frontend API (JavaScript, React), Frontend Component Design, Database Design, Application Structure and Interface Design
- vfchen2: Backend API(Node.js), Tigger Operations(MySQL), Dataset Generation

Overall, our team has good work distribution and a great team atmosphere. The communication is direct and clear, each member is assigned to the position that he is comfortable with. Most importantly, the TA,Naifu Zheng, is very supportive and provided a lot of useful advice that guides us to the right direction.
# Future Work
1. More sophisticated user interface
2. Transfer data from SQL to NoSQL for flexibility
3. Implement fully functional "membership mechanism" for preference suggestion
4. Combine with notification systems(SMS message, email)
5. Combine with online payment system

