const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const config = require("./config");

//* Creating local strategy and passing authenticate function to the User schema
exports.local = passport.use(new LocalStrategy(User.authenticate()));

//* Tracking users with sessions
//* Serialize and deserialize User schema
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//* Creating and exporting token
exports.getToken = function (user) {
	return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

//* Configuring and Exporting webToken

//* Options for JWT based strategy
const opts = {};

//* This options specifies how the json web token should be extracted from the incoming request message
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//* Export JWT passport
exports.jwtPassport = passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		console.log("JWT payload: ", jwt_payload);
		User.findOne({ _id: jwt_payload._id }, (err, user) => {
			if (err) {
				return done(err, false);
			} else if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
