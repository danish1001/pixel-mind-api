This app contains Routes folder which contains all the files and routs to which api end points can be hit

Admin approval for a blog
/api/blogs/adminApprove/:blogId

Employee approval for a blog
/api/blogs/employeeApprove/:blogId

To get all blogs of a user
/api/blogs

To post blogs of a user
/api/blogs


//  CREATE NEW USERS BY POST REQUEST (i.e. Admin, Employee, Customer)
app.use("/api/users", require("./routes/Register"));

// Authorizes user to get LoggedIn user and to Login user
app.use("/api/auth", require("./routes/auth"));

// Get All blogs
app.use("/api/blogs", require("./routes/blogs"));

