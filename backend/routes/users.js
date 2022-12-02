var express = require("express") ;
// import { registerUser,homepage,adminpage,userInfo,editUser,login,emailReservations,deleteReservation,checkRevenue,checkFeature,bookingCheck,bookARoom } from "../controller/user.js";
var router = express.Router();
var mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hotel'
});



/* GET users listing. */

//const usersDB = []

// mainpage
router.get("/", (req,res) => {
  res.send("This is the homepage");
});

// register (email, password, phone, name)
router.post("/register",(req,res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const name = user.name;
  const phone = user.phone;
  const membership = user.membership;
  const addNewUser = "INSERT INTO User (email,name,password,phone,membership) VALUES(?,?,?,?,?)";
  db.query(addNewUser,[email,name,password,phone,membership],(err,result) => {
      if(err){
          // res.status(400);
          // res.sendStatus(400);
          res.status(400).json();
      }else{
          res.status(200).json(user);
      }
      // console.log(res.statusCode);
  });
  // test
  // usersDB.push(user);
  // res.send(`Hi ${user.email}! Your membership ranking is 1 !`);
});

//admin
router.get("/admin",(req,res) => {
  //res.send(usersDB);
  // const allRegiteredUser = "SLECT * FROM User";
  // res.send(allRegiteredUser);
});

// /<email>/info
router.get("/:email",(req,res) => {
  const {email} = req.params;
  const foundUser = "SELECT * FROM User WHERE User.email = \"" + email + "\";";
  db.query(foundUser, (err, result) => {
      if(!result){
          res.send("User not found");
      }else{
          res.send(result);
      }
  });
});
router.patch("/:email",(req,res) => {
  const {email} = req.params;
  const {name,password,phone} = req.body;
  const foundUser = "SELECT * FROM User WHERE User.email = \"" + email + "\";";
  db.query(foundUser, (err, result) => {
      if(!result){
        console.log("User not found");
          // res.send("User not found");
          // res.end();
      }
  });
  if (name){
      updateName = "UPDATE User SET User.name = \"" + name + "\" WHERE User.email = \"" + email + "\";";
      db.query(updateName, (err, result) => {
          // res.send(`name update successfully`);
          // res.status(200).json();
          if (err) {
            res.status(400).json();
            return;
          }

      });
  }
  // if (password){
  //     updatePass = "UPDATE User SET User.password = password WHERE User.email = " + email ;
  //     db.query(updatPass, (err, result) => {
  //         res.send(`password update successfully`);
  //         res.status(400);
  //     });
  // }
  if (phone){
      updatePhone = "UPDATE User SET User.phone = \"" + phone + "\" WHERE User.email = \"" + email + "\";";
      db.query(updatePhone, (err, result) => {
          // res.send(`phone update successfully`);
          if (err) {
            res.status(400).json();
            return;
          }
      });
  }

  res.status(200).json();
  // test
  // const updateTheUser = usersDB.find((user) => user.email == email);
  // if (name) {
  //   updateTheUser = "UPDATE User SET User.name = name WHERE User.email = " + email ;
  //   res.send(`Hi ${updateTheUser.name} update successfully`);
  // }
  // if (password) {
  //   updateTheUser = "UPDATE User SET User.password = password WHERE User.email = " + email ;
  //   res.send(`Hi ${updateTheUser.password} update successfully`);
  // }
  // if (phone) {
  //   updateTheUser = "UPDATE User SET User.phone = phone WHERE User.email = " + email ;
  //   res.send(`Hi ${updateTheUser.phone} update successfully`);
  // }
});

// LOGIN Authentication
router.post("/login", (require, response) => {
  const userName = require.body.email;
  const passWord = require.body.password;  
  // console.log(require);

  if (userName && passWord){
      const getPass = "SELECT * FROM User WHERE User.email = \""+userName +"\" AND User.password = \"" + passWord + "\";";
      db.query(getPass, (err,result) => {
          if (result.length > 0) {
              // request.session.loggedin = true;
              // request.session.user_name = username;
              // console.log(result);
              response.status(200).json(result);
              //response.redirect('/'+userName);
          }
          else{
              response.status(400).json('Incorrect Username and/or Password!');
          }
      });
  }
  else{
      response.status(400).json('Please enter Username and Password!');
  }
});

// export const emailReservations = (req, res)=>{
//   const {email} = req.email;
//   const getReserve = "SELECT * FROM Reservation WHERE User.email = " + email ;
//   db.query(getPass, (err,result) => {
//       res.send(result);
//   });
// };

// export const deleteReservation = (req, res) => {
//   const {email} = req.email;
//   const {reservation_id} = reservation_id;
//   const sqlDelete = "DELETE FROM Reservation WHERE reservation_id = "+ reservation_id;
//   db.query(sqlDelete, (err, result) => {
//       if (err) 
//       console.log(err);
//   });
// };

// export const checkRevenue = (req,res) =>{
//   const revenue_query = "SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue FROM Reservation res JOIN Room rm USING(room_number) GROUP BY res.checkin_month ORDER BY res.checkin_month;";
//   db.query(revenue_query,(err,result) => {
//       res.send(result);
//   });
// });

// <email>/reservations
router.get('/:email/reservations',(req, res)=>{
  const { email } = req.params;
  const getReserve = "SELECT * FROM Reservation WHERE email = \"" + email  + "\";";
  db.query(getReserve, (err,result) => {
      res.send(result);
  });
});

// room number
// service_id


router.post("/:email/service",(req,res)=>{
  const email = req.params;
  const service_id = req.body.service_id;
  const room_number = req.body.room_number;
  const time = req.body.date;
  const hasRoom = "SELECT * FROM Reservation WHERE room_number = "+room_number+";";
  db.query(hasRoom,(err,result) => {

    if (err || res.length == 0) {
      res.status(400).json();
      console.log(err);
    } else {
    const getService = "INSERT INTO Request (time,room_number,service_id) VALUES(?,?,?);";
    db.query(getService,[time,room_number,service_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json();
      }
    });
    }
  });
});

// show Charter table
router.get('/admin/charter',(req, res)=>{
  const getCharter = "SELECT * FROM Charter;";
  db.query(getCharter, (err,result) => {
      res.send(result);
  });
});

// show Employee table
router.get('/admin/employee',(req, res)=>{
  const getEmployee = "SELECT * FROM Employee;";
  db.query(getEmployee, (err,result) => {
      res.send(result);
  });
});

// show Employee salary
router.get('/admin/salary',(req, res)=>{
  const getEmployeeSalary = "SELECT SUM(salary) FROM Employee;";
  db.query(getEmployeeSalary, (err,result) => {
      res.send(result);
  });
});


//<email>/delete
router.delete("/:email/reservations/:reservation_id/:room_number",(req, res) => {
  const { email , reservation_id, room_number } = req.params;
  const sqlDelete = "DELETE FROM Reservation WHERE reservation_id = "+ reservation_id + " and email = \"" + email + "\" and room_number = " + room_number + ";";
  db.query(sqlDelete, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json();
      }
  });
} );

// // admin/check-revenue 
router.get('/admin/check-revenue',(req,res) =>{
  const revenue_query = "SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue FROM Reservation res JOIN Room rm USING(room_number) GROUP BY res.checkin_month ORDER BY res.checkin_month;"
  //const service_query = "SELECT res.checkin_month AS month, SUM(s.price) * s.price AS service_revenue FROM Reservation res JOIN Request USING(room_number) JOIN Service s USING (service_id) GROUP BY res.checkin_month ORDER BY res.checkin_month;";
  //const revnueservice_query = "SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS room_revenue,(SELECT COUNT(s.service_id) * s.price FROM Reservation res JOIN Request USING(room_number) JOIN Service s USING (service_id) GROUP BY res.checkin_month ORDER BY res.checkin_month) as service_revenue FROM Reservation res JOIN Room rm USING(room_number) GROUP BY res.checkin_month ORDER BY res.checkin_month;"
  db.query(revenue_query,(err,result1) => {
      console.log(result1);
      res.send(result1);
  });
});

// admin/check-feature
router.post('/admin/check-feature',(req,res) => {
  const min_price = req.body.minPrice;
  const max_price = req.body.maxPrice;
  const feature_query = "SELECT feature, COUNT(res.reservation_id) AS popularity FROM Reservation res JOIN Room rm USING(room_number) WHERE rm.price <= "+ max_price+ " AND rm.price >= "+min_price+" GROUP BY rm.feature ORDER BY rm.feature;";
  db.query(feature_query,(err,result) => {
      res.send(result);
  });

});
router.post('/admin/change-price',(req,res) =>{
  const min_price = req.body.minPrice;
  const max_price = req.body.maxPrice;
  const revenue_query = "call Result("+min_price+","+max_price+");";
  db.query(revenue_query,(err,result) => {
      console.log(result);
      res.send(result);
  });
});

// admin/hire
router.post('/admin/hire',(req,res) => {
  // const emp_id = req.body.emp_id;
  const title = req.body.title;
  const salary = req.body.salary;
  // const mob_id = req.body.mob_id;
  const getMaxemp_id =  "SELECT MAX(emp_id) as id FROM Employee;";
  const add_employee = "INSERT INTO Employee (emp_id,title,salary,mob_id) VALUES(?,?,?,NULL);";
  db.query(getMaxemp_id, (err, result) => {
    const emp_id = result[0].id + 1;
    db.query(add_employee, [emp_id,title,salary],(err,result1) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json();
      }
    });
  });
});

// admin/delete
router.delete('/admin/layoff/:emp_id',(req, res)=>{
  // if old employee has a mob_id:
  //   1. find new employee who mob_id is NULL
  //   2. update new employee's mob_id to this mob_id
  //   3. update mob_id's emp_id to the new emp_id
  //   4. update old employee's mob_id to NULL
  const {emp_id} = req.params;
  const checkMobId = "SELECT mob_id FROM Employee WHERE emp_id = " + emp_id + ";";
  const findNewEmpId = "SELECT emp_id FROM Employee WHERE mob_id IS NULL LIMIT 1;";
  
  db.query(checkMobId, (err,result) => {
    if (err) {
      console.log(err);
    } else {
      if (result[0].mob_id){
        const newMobId = result[0].mob_id
        db.query(findNewEmpId, (err,result1) => {
          const newEmpId = result1[0].emp_id
          const updateNewEmpId = "UPDATE Employee SET mob_id = " + newMobId + " WHERE emp_id = "+ newEmpId +";";
          db.query(updateNewEmpId, (err,result2) => {
            const updateNewMobId = "UPDATE Mobiles SET emp_id = " + newEmpId + " WHERE mob_id = "+ newMobId +";";
            db.query(updateNewMobId, (err,result3) => {
              const updateOldEmpId = "UPDATE Employee SET mob_id = NULL WHERE emp_id = "+ emp_id +";";
              db.query(updateOldEmpId, (err,result4) => {});
            });
          });
        });
      }
      const layoffEmployee = "DELETE FROM Employee WHERE emp_id = "+ emp_id + ";";
      db.query(layoffEmployee, (err,result5) => {
        if (err) {
          console.log(err);
          res.status(400).json();
        } else {
          res.status(200).json();
        }
      });
    }
  });
});


// booking
router.post('/booking/getroom',(req,res) => {
  
  // const cust_checkin_year= req.body.checkin_year;
  // const cust_checkin_month= req.body.checkin_month;
  const checkin_date= req.body.checkin_date;
  const checkout_date= req.body.checkout_date;
  // const cust_checkout_month=req.body.checkin_month;
  // const cust_checkout_date=req.body.checkin_date;
  // const booking_query = "(SELECT (room_number, price, feature, accomodation FROM Room ro natural join Reservation re) MINUS (SELECT room_number, price, feature, accomodation FROM Room ro natural join Reservation re WHERE " + checkin_date + " BETWEEN re.checkin_date AND re.checkout_date AND " +checkout_date+ " BETWEEN re.checkin_date AND re.checkout_date));";
  //const booking_query = "(SELECT (room_number, price, feature, accomodation FROM Room ro natural join Reservation re WHERE room_number not in (SELECT room_number FROM Room ro natural join Reservation re WHERE " + checkin_date + " BETWEEN re.checkin_date AND re.checkout_date AND " +checkout_date+ " BETWEEN re.checkin_date AND re.checkout_date));)) MINUS";
  const booking_query = "SELECT room_number, price, feature, accomodation FROM Room ro natural join Reservation re EXCEPT SELECT room_number, price, feature, accomodation FROM Room ro natural join Reservation re WHERE " + checkin_date + " BETWEEN re.checkin_date AND re.checkout_date OR " +checkout_date+ " BETWEEN re.checkin_date AND re.checkout_date;";
  db.query(booking_query,(err,result)=> {
      console.log(err);
      res.json(result);
  });
;
});



router.post("/booking",(req,res) => {
  
  const selected_room_number = req.body.room_number;
  const cust_phone = req.body.phone;
  const cust_lastName = req.body.lastName;
  const cust_firstName = req.body.firstName;
  const cust_email = req.body.email;
  const cust_checkin_year= req.body.checkin_year;
  const cust_checkin_month= req.body.checkin_month;
  const cust_checkin_date= req.body.checkin_date;
  const cust_checkout_year= req.body.checkout_year;
  const cust_checkout_month=req.body.checkout_month;
  const cust_checkout_date=req.body.checkout_date;

  const checkin = new Date(cust_checkin_month+'/'+cust_checkin_date+'/'+cust_checkin_year);
  const checkout = new Date(cust_checkout_month+'/'+cust_checkout_date+'/'+cust_checkout_year);
  const days = (date1, date2) => {
    let differ = date1.getTime() - date2.getTime();
    let TotalDays = Math.ceil(differ / (1000*3600*24));
    return TotalDays;
  };

  const duration = days(checkout, checkin);
  console.log(duration);
  const reservationInsert = "INSERT INTO Reservation (reservation_id,room_number, email, checkin, checkout,checkin_year,checkin_month,checkin_date,checkout_year,checkout_month,checkout_date,duration) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);"
  const getMaxReservaton = "SELECT MAX(reservation_id) as id FROM Reservation;";
  db.query(getMaxReservaton, (err, result) => {
    if (err) {
      res.status(400).json();
      return ;
    }else{
      const reservationID = result[0].id + 1;
      db.query(reservationInsert,[reservationID,selected_room_number,cust_email,checkin, checkout, cust_checkin_year,cust_checkin_month,cust_checkin_date,cust_checkout_year,cust_checkout_month,cust_checkout_date,duration],(err,result) => { 
        if (err){
            res.status(400).json();
            console.log(err);
        }else{
            res.status(200).json(result);
        }
        return ;
      });
    };
  });
});

module.exports = router;
// router.listen(3000, () => {
//   console.log("running on port 3000");
// });
