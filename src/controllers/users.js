var mongodb = require('mongodb').MongoClient;
var { ObjectId } = require('mongodb');
var bcrypt = require('bcryptjs');

let uri = 'mongodb://heroku_t75xnp7c:kgd4nfkmrtlac6oce58601pbml@ds127646.mlab.com:27646/heroku_t75xnp7c';

// Finish
async function addUser (req, res) {
	const newUser = {
		fname: req.body.fname,
		lname: req.body.lname,
		username: req.body.email,
		password: req.body.password,
		role: req.body.role
	}

	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;

			mongodb.connect(uri, function(err, client){
				let db = client.db('heroku_t75xnp7c');
				let users = db.collection('users');

				users.insertOne(newUser, function(err, doc){
					if(err){
						console.log(err)
					} else {
						console.log('User Added...');
						res.send({
							msg: "Usuario agregado"
						});
					}
				});

				client.close(function (err) {
					if(err) throw err;
				  });
			});
		});
	});
};

// Finish
async function getUser (req, res) {
	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let users = db.collection('users');

		users.findOne({username: req.params.email }, function(err, user){
			res.send(user);
		});

		client.close(function (err) {
			if(err) throw err;
		  });
	});
};

// Finish
async function updateUser (req, res) {
	const updatedUser = {
		fname     		: req.body.fname,
		lname 			: req.body.lname,
		username    	: req.body.email,
		password 		: req.body.password,
		role 			: req.body.role
	}

	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(updatedUser.password, salt, function(err, hash){
			updatedUser.password = hash;

			mongodb.connect(uri, function(err, client){
				let db = client.db('heroku_t75xnp7c');
				let users = db.collection('users');
		
				users.updateOne({username: req.params.email},{
					$set: updatedUser
				}, { 
					upsert: false 
				}, function(err, user){
					res.send({
						msg: "Usuario actualizado"
					})
				});
		
				client.close(function (err) {
					if(err) throw err;
				  });
			});
		});
	});
};

// Finish
async function deleteUser (req, res) {
	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let users = db.collection('users');

		users.deleteOne({
			username: req.params.email
		})

		client.close(function (err) {
			if(err) throw err;
		  });
	});
	res.send({
		msg: `Se ha borrado el usuario`
	})
};

// Finish
async function getAll (req, res) {
	mongodb.connect(uri, function(err, client){
        let db = client.db('heroku_t75xnp7c');
        let collection = db.collection('users');

        collection.find().toArray()
            .then(result => {
                const users = result.map(user => {
					let role = 'Empleado';
					switch(user.role){
						case '1':
							role = 'Administrador';
							break;
						case '2':
							role = 'Tecnico';
							break;
						case '3':
							role = 'Empleado';
							break
						default:
							role = 'Empleado'
					}
                    return {
                        fname: user.fname,
                        lname: user.lname,
                        email: user.username,
                        role: role
                    }
                })
                
                res.send(users);
            })
    
        client.close(function (err) {
            if(err) throw err;
          });
    });
}

module.exports = {
	addUser: addUser,
	getUser: getUser,
	updateUser: updateUser,
	deleteUser: deleteUser,
	getAll: getAll
};