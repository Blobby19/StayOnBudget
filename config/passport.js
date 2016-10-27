var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;

module.exports = function(passport){
	passport.use(new LocalAPIKeyStrategy(function(apiKey, done){
		if(apiKey == 'test1234'){
			return done(null, {user: "Luc Viala"});
		}
		return done({err: "Erreur de login!"});
	}));

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(id, done){
		done(undefined);
	});
}