const jwt = require("jsonwebtoken");
const JWT_SECRET_ = "This is Token key for NoteBookApp created by Anurup";

const fetchUser = (req, res, next) => {
  const token = req.header("user-token");
  if (!token) {
    res.status(401).send("Authenticate using valid token");
  }

  try {
    const userData = jwt.verify(token, JWT_SECRET_);
    req.user = userData.user;
    next();
  } catch (error) {
    res.status(401).send("Authenticate using valid token");
  }
};

module.exports = fetchUser;
