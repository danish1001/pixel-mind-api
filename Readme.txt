This app contains Routes folder which contains all the files and routs to which api end points can be hit

Admin approval for a blog       -- Post Request
/api/blogs/adminApprove/:blogId

Employee approval for a blog      -- Post Request
/api/blogs/employeeApprove/:blogId

To get all blogs of a user    -- GET request
/api/blogs

To post blogs of a user     -- Post Request
/api/blogs

// Authorizes user to get LoggedIn user -- GET request
/api/auth

// Authorizes user to get Logg In user  -- Post Request
/api/auth

//  CREATE NEW USERS BY POST REQUEST (i.e. Admin, Employee, Customer)     -- Post Request
app.use("/api/users", require("./routes/Register"));

// Authorizes user to get LoggedIn user and to Login user
app.use("/api/auth", require("./routes/auth"));

// Get All blogs
app.use("/api/blogs", require("./routes/blogs"));



Authentication is done using JWT tokens
There are some missing things because of time limit i was not able to complete.

