const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

//* Creating local strategy and passing authenticate function to the User schema
exports.local = passport.use(new LocalStrategy(User.authenticate()));

//* Tracking users with sessions
//* Serialize and deserialize User schema
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
