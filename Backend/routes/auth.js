const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); //hashing
const saltRound = 10; //salt round in Hashing
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "Chacha_Chaudhary"; //key for the Jsonwebtoken
const fetchUser = require("../middleWares/fetchData"); //FETCHUSER a middle ware that simply take the token from header by any variable let auth-token and from this token we can decode the payload by jwt.verify(token,key) which was the userId used in creation of the authToken or logintoken by jwt.sign method and finaly we can pass to it and get the data for that user
const { body, validationResult } = require("express-validator"); // a middleware used in authemtication and validation  process to validate enterred details is corrent or not and validationResult will return an array of errors came due to wrong and illegal entries by user
const User = require("../models/User");

//A function that return the hashPassword of  given password
const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (err) {
    throw new Error("Hashing Failed  : ", err);
  }
};

// Router 1
//USer Sign Up Credentials Validation using Post: api/auth/signup  No Login Required

router.post(
  "/signUp",
  [
    //middleware handle user entered data validation and put the error in validationResult return array
    body("Name", "Name Must be at least 3 letters long").isLength({
      max: 50,
      min: 3,
    }),
    body("Email", "Please Use the Valid Email Address").isEmail(),
    body("Phone").isNumeric(),
    body("Password", "Password at least contain 6 Letters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //Try and catch block to tackle the internel server code and Resource error
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //A User will be created in the DB where User is  require("../models/User");
      User.create({
        Name: req.body.Name,
        Password: await generateHash(req.body.Password), //hashPassword
        Phone: req.body.Phone,
        Email: req.body.Email,
      })
        .then((user) => {
          //Create JWT token for session validation
          const data = {
            user: {
              id: User.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET_KEY);
          res.json({ success: true, authToken });
        })
        .catch((err) => {
          if (err.code === 11000) {
            //because in UserSchema we have pass to the Email Unique:true thats why on entering the already existed email will cause a error and catch function will caught the error and for duplicate entries error code is 11000
            res
              .status(400)
              .json({ error: "Sorry a user with this email already exist" });
            console.error("Duplicate key error:", err);
            // Handle duplicate key error (E11000) here
          } else {
            console.error("Error creating user:", err);
            // Handle other errors otherthan error 11000 or duplicate value error
          }
        });
    } catch (error) {
      //Code or Internal server error will be handle here These error will be due to program failure or code failure
      res
        .status(500)
        .json({ error: "Internel Server Error Report the Issue to Devoloper" });
    }
  }
);
// Router 2
//USer Login Credentials Validation using Post: api/auth/Login No Login Required
router.post(
  "/Login",
  [
    body(
      "Email",
      "Email must contain '@' sign please enter a valid email"
    ).isEmail(),
    body("Password", "Please Enter Valid Password").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }
    try {
      const { Email, Password } = req.body;
      const user = await User.findOne({ Email });
      if (user) {
        //Now we check if the user have given the right password
        //Using Bcrypt hashmatching
        const match = await bcrypt.compare(Password, user.Password); //this method will check the given password with the hashpassword and if both were same it will return the true otherthan false
        if (match) {
          const data = {
            //can say Payload which make uniquely identify the user by his unique logintoken or Jsonwebtoken
            user: {
              id: user.id,
            },
          };
          const loginToken = jwt.sign(data, JWT_SECRET_KEY); //create a signature which will be authrority to acess the services by admin to the user
          return res.json({
            success: true,
            Message: "Login Successfull!!: Welcome " + user.Name,
            loginToken,
          });
        }
      }
      return res.json({
        success: false,
        Message: "You have Entered Wrong Credentials",
      });
    } catch (error) {
      res.status(500).json({
        Message:
          "Internal Server Error Occured !!\n Please Try again later or Contact Dev Team",
      });
    }
  }
);

//Router 3
// Getting User Details using Get: api/auth/getUser   Login Required
router.get("/Account", fetchUser, async (req, res) => {
  //fetchUser : middleware that provide the userId by decoding the authToken/loginToken or Simply token and append that user id to req object
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-Password"); //retrive(by : select()) all the information of the user other than Password with a given userId or id(by : findById())
    res.json({ user });
  } catch (error) {
    res.status(500).json({ Message: "Internal Server Error Occured" });
  }
});

module.exports = router;
