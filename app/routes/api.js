module.exports = function(router, passport){

	router.post('/login', passport.authenticate('local-login'), function(req, res){
		if(req.isAuthenticated()){
			res.send(200);
		}
		res.send(401);
	});

	router.post('/register', passport.authenticate('local-signup'), function(req, res){

	});

	router.post('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};