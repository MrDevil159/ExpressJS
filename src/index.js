const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
// require('./strategies/local')
require('./strategies/github')
require('./database/index')


const groceriesRoute = require("./routes/groceries");
const marketRouters = require("./routes/markets");
const authRouters = require("./routes/auth");


const app = express();
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "ASDEWRWERKEWFKEWFK@#$WEF<WEFMEWF>658758",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/expressjs"
      }
    )
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketRouters);
app.use("/api/v1/auth", authRouters);


app.listen(PORT, () => console.log(`Running Express server on port ${PORT}`));
