const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "Chacha_Chaudhary";

const fetchUser = (req, res, next) => {
  //Get UserID from the JW token and add id to the req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Please Authenticate using a valid Token");
  }
  try {
    // Now by using the jwt.verify() we will back our user information or data by giving a valid token to this method
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Please Authenticate using a valid token");
  }
};

module.exports = fetchUser;