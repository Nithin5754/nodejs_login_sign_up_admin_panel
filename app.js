require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { v4: uuidv4 } = require("uuid");
const noCache = require('nocache')





const express = require("express");
const app = express();



app.use(express.static(path.join(__dirname, 'public')));

// initalization session

const connectDB = require("./config/connect");
const loginRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes")


// not found middleware
const notFoundMIddleWare = require('./middleware/notFound');


app.use(express.json());
app.set("views", path.join(__dirname, "views"));

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(noCache());





app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360000 },
   
  }),
);


// routes
app.use("/", loginRoutes);
app.use("/", adminRoutes)

app.use(notFoundMIddleWare)



// port with moongoose

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server started ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
