Please list out changes in directions of your project if the final project is different from your original proposal (based on your stage 1 proposal submission).
Discuss what you think your application achieved or failed to achieve regarding its usefulness.
Discuss if you changed the schema or source of the data for your application
Discuss what you change to your ER diagram and/or your table implementations. 
  What are some differences between the original design and the final design? Why? What do you think is a more suitable design? 
Discuss what functionalities you added or removed. Why?
Explain how you think your advanced database programs complement your application.
Each team member should describe one technical challenge that the team encountered. 
  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project. 
Are there other things that changed comparing the final application with the original proposal?
Describe future work that you think, other than the interface, that the application can improve on
Describe the final division of labor and how well you managed teamwork. 


# Difference from Original Proposal
`The rudimentary users can only make reservations with the number of travelers and the time they stay.` After thorough consideration, we decided to drop this feature because this is not suitable to categorize customers and limit their optioins base on membership.
As proposal the user can unlock more feature such as room preference selection, shuttle bus reservation and additional room services as their membership increase. We then decided to open our services to all customers.
The functionality of `membership` will be used as the reference for discount in the future work.
To sum up, we deprecated the feature of `membership` along with its recommendation functionality.
Except for this, we've matched all the features from the proposal.

# Usefulness evaluation 
`
Reservation management: In the reservation database, the admins are able to check the availability of each room according to different types of the rooms, and offer promotion via the membership.
`
We've accomplished this application. The admin can easily check the revenue by clicking the `check revenue`.
`
Service management: The service database will provide all the service information that the hotel provided. The admin can easily schedule the human resources according to the time, and report the availability.
`
`
HR management: We integrate our management database with HR database to keep all interactions with employees under control. Among all the benefits are task management and time-scheduling. The manager of the hotel can assign tasks and track the completion of tasks in the system. In this way, it saves a lot of time for human resources distribution.
`
# Alternation in Schema
We change the data type of date in the `Reservation` table from `INT` to `DATE` so that we can calculate the available room from the user given check_in date and check_out date.

