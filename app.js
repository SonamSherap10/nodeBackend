const express = require("express")
const app = express()

// Importing routes
const authroute = require("./routes/authroute")
const productRoute = require("./routes/productRoute")
const user = require("./routes/userRoute")
const review = require("./routes/userReviewRoute")

// Connecting to the database
require("dotenv").config()
const { connectdb } = require("./database/dbconfig")

connectdb(process.env.MONGO_URL)

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register & login api
app.use("/api/auth", authroute)
app.use("/api/product", productRoute)
app.use("/api/user", user) 
app.use("/api/review", review) 

app.use(express.static("./files"))

// Home page
app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the home page",
  })
})

app.listen(port, () => {
  console.log(`The project is active on port no ${port}`)
})
