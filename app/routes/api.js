module.exports = function(router, passport){
	router.post('/authenticate', 
		passport.authenticate('localapikey', {failureRedirect : '/api/unauthorized'}), 
		function(req, res){
			res.json({message: "Authenticated", user: user});
		});

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	router.get('/unauthorized', function(req, res){
		res.send(401);
	});

	var isAuthenticated = function (req, res, next) {
  		if (req.isAuthenticated())
			return next();
		res.redirect('/');
	}
};