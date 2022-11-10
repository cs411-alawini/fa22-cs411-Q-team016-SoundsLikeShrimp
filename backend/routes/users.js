var express = require("express") ;
// import { registerUser,homepage,adminpage,userInfo,editUser,login,emailReservations,deleteReservation,checkRevenue,checkFeature,bookingCheck,bookARoom } from "../controller/user.js";
var router = express.Router();
// const router = express();
// router.use(cors());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(express.json());
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
  console.log(JSON.stringify(req.body));
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const name = user.name;
  const phone = user.phone;
  const membership = user.membership;
  const addNewUser = "INSERT INTO User (email,name,password,phone,membership) VALUES(?,?,?,?,1)";
  db.query(addNewUser, (err,result) => {
      if(err){
          res.status(400);
      }else{
          res.status(200);
      }
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
router.get("/:email/info",(req,res) => {
  const {email} = req.params;
  const foundUser = "SELECT * FROM User WHERE User.email = " + email ;
  db.query(foundUser, (err, result) => {
      if(!result){
          res.send("User not found");
      }else{
          res.send(foundUser);
      }
  });
});
router.patch("/:email/info",(req,res) => {
  const {email} = req.params;
  const {name,password,phone} = req.body;
  const foundUser = "SELECT * FROM User WHERE User.email = " + email ;
  db.query(foundUser, (err, result) => {
      if(!result){
          res.send("User not found");
          res.end();
      }
  });
  if (name){
      updateName = "UPDATE User SET User.name = name WHERE User.email = " + email ;
      db.query(updateName, (err, result) => {
          res.send(`name update successfully`);
          res.status(400);
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
      updatePhone = "UPDATE User SET User.phone = phone WHERE User.email = " + email ;
      db.query(updatePhone, (err, result) => {
          res.send(`phone update successfully`);
          res.status(400);
      });
  }
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
  const userName = require.body.userName;
  const passWord = require.body.passWord;  
  console.log(userName);

  if (userName && passWord){
      const getPass = "SELECT * FROM User WHERE User.email = "+userName +"AND User.password" + passWord;
      db.query(getPass, (err,result) => {
          if (result.length > 0) {
              // request.session.loggedin = true;
              // request.session.user_name = username;
              response.status(200);
              //response.redirect('/'+userName);
          }
          else{
              response.send('Incorrect Username and/or Password!');
              response.status(400);
          }
          response.end();
      });
  }
  else{
      response.send('Please enter Username and Password!');
      response.status(400);
      response.end();
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
  const {email} = req.email;
  const getReserve = "SELECT * FROM Reservation WHERE User.email = " + email ;
  db.query(getPass, (err,result) => {
      res.send(result);
  });
});

//<email>/delete
router.delete("/:email/reservations/:reservation_id",(req, res) => {
  const {email} = req.email;
  const {reservation_id} = reservation_id;
  const sqlDelete = "DELETE FROM Reservation WHERE reservation_id = "+ reservation_id;
  db.query(sqlDelete, (err, result) => {
      if (err) 
      console.log(err);
  });
} );

// admin/check-revenue 
router.get('/admin/check-revenue',(req,res) =>{
  const revenue_query = "SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue FROM Reservation res JOIN Room rm USING(room_number) GROUP BY res.checkin_month ORDER BY res.checkin_month;";
  db.query(revenue_query,(err,result) => {
      res.send(result);
  });
});

// admin/check-feature
router.post('/admin/check-feature',(req,res) => {
  const min_price = req.body.minPrice;
  const max_price = req.body.maxPrice;
  const feature_query = "SELECT rm.feature, COUNT(res.reservation_id) AS popularity FROM Reservation res JOIN Room rm USING(room_number) WHERE rm.price <= "+ max_price+ " AND rm.price >= "+min_price+"GROUP BY rm.feature ORDER BY rm.feature;";
  db.query(feature_query,(err,result) => {
      res.send(result);
  });

});

// booking
router.post('getroom',(req,res) => {

  const cust_checkin_year= req.body.checkin_year;
  const cust_checkin_month= req.body.checkin_month;
  const cust_checkin_date= req.body.checkin_date;
  const cust_checkout_year= req.body.checkin_year;
  const cust_checkout_month=req.body.checkin_month;
  const cust_checkout_date=req.body.checkin_date;
  const booking_query = "SELECT room_number, price, feature, accomodation FROM Room ro natural join Reservation re WHERE cust_checkin_year <= re.checkin_year <= cust_checkout_year  and cust_checkin_month <= re.checkin_month <= cust_checkout_month and cust_checkin_date <= re.checkin_date <= cust_checkout_date;";

  db.query(booking_query,(err,result)=> {
      res.send(result);
  });
;
});

router.post("/booking",(req,res) => {
  
  const selected_room_number = req.body.room_number;
  const cust_phone = req.body.phone;
  const cust_lastName = req.body.lastName;
  const cust_firstName = req.body.firstName;
  const cust_email = req.email;
  const cust_checkin_year= req.body.checkin_year;
  const cust_checkin_month= req.body.checkin_month;
  const cust_checkin_date= req.body.checkin_date;
  const cust_checkout_year= req.body.checkin_year;
  const cust_checkout_month=req.body.checkin_month;
  const cust_checkout_date=req.body.checkin_date;
  const reservationInsert = "INSERT INTO Reservation (reservationID,selected_room_number,cust_email,cust_checkin_year,cust_checkin_month,cust_checkin_date,cust_checkout_year,cust_checkout_month,cust_checkout_date) VALUES(?,?,?,?,?,?,?,?,?)"
  const getMaxReservaton = "SELECT MAX(reservation_id) FROM Resrvation;" ; 
  db.query(getMaxReservaton, (err, result) => {
    if (err){
      return res.status(400);
    }else{
      const reservationID = result + 1;
      db.query(reservationInsert,[reservationID,selected_room_number,cust_email,cust_checkin_year,cust_checkin_month,cust_checkin_date,cust_checkout_year,cust_checkout_month,cust_checkout_date],(err,result) => { 
        if (err){
            return res.status(400);
        }else{
            return res.status(200);
        }
      });
    };
  });
});

module.exports = router;
// router.listen(3000, () => {
//   console.log("running on port 3000");
// });
