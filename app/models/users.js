var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var rand = require('rand-token');

var userSchema = new mongoose.Schema({
	local:{
		username: String,
		password: String
	},
	token:{
		type: Schema.Types.ObjectId,
		ref: 'Token',
		default: null
	},
	accounts:[{
		type: Schema.Types.ObjectId,
		ref: 'Account',
		default: null
	}]
});

var tokenSchema = new mongoose.Schema({
	value: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	expireAt:{
		type: Date, 
		exprires: '1h',
		default: Date.now()
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.generateToken = function(){
	var token = new Token();
	token.value = rand.generate(32);
	token.user = this._id;
	this.token = token._id;
	this.save(function(err){
		if(err) throw err;
		token.save(function(err){
			if(err) throw err;
		});
	});
};

var User = mongoose.model('User', userSchema);
var Token = mongoose.model('Token', tokenSchema);

var Models = {User: User, Token: Token};

module.exports = Models;