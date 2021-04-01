const express = require("express");
const app = express();

const connectDB = require("./config/db");

// connect db
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res)=> {
  res.json({msg: "This is API for pixel-mind"});
});

// define routes -----------------------------------------------------------------

//  CREATE NEW USERS BY POST REQUEST (i.e. Admin, Employee, Customer)
app.use("/api/users", require("./routes/Register"));

// Authorizes user to get LoggedIn user and to Login user
app.use("/api/auth", require("./routes/auth"));

// Get All blogs
app.use("/api/blogs", require("./routes/blogs"));









const PORT = process.env.PORT || 5000;

app.listen(PORT, function(req, res) {
  console.log(`server started on port ${PORT}`);
})