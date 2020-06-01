var mongodb = require('mongodb').MongoClient;
var { ObjectId } = require('mongodb');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

let uri = 'mongodb://heroku_t75xnp7c:kgd4nfkmrtlac6oce58601pbml@ds127646.mlab.com:27646/heroku_t75xnp7c';

async function login(req, res){
	passport.authenticate('local');

	console.log('Auth Successfull');
	res.send({status: 200});
}

async function logout(req, res){
	req.logout();
	res.send({status: 200});
}

passport.serializeUser(function(user, done) {
	done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
	  mongodb.connect(uri, function(err, client){
		  let db = client.db('heroku_t75xnp7c');
		  let users = db.collection('users');
  
		  users.findOne({_id: new ObjectId(id)}, function(err, user){
			  done(err, user);
		  });
  
		  client.close(function (err) {
			  if(err) throw err;
			});
	  });
  });
  
  passport.use(new LocalStrategy(
	  function(username, password, done){
		  mongodb.connect(uri, function(err, client){
			  let db = client.db('heroku_t75xnp7c');
			  let users = db.collection('users');
  
			  users.findOne({username: username}, function(err, user){
				  if(err) {
					  return done(err);
				  }
				  if(!user){
					  return done(null, false, {message: 'Usuario incorrecto'});
				  }
	  
				  bcrypt.compare(password, user.password, function(err, isMatch){
					  if(err) {
						  return done(err);
					  }
					  if(isMatch){
						  return done(null, user);
					  } else {
						  return done(null, false, {message: 'Contraseña incorrecta'});
					  }
				  });
  
				  client.close(function (err) {
					  if(err) throw err;
					});
			  });
		  });
	  }
  ));

module.exports = {
	login: login,
	logout: logout
}