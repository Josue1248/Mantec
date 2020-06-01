var mongodb = require('mongodb').MongoClient;
var { ObjectId } = require('mongodb');

let uri = 'mongodb://heroku_t75xnp7c:kgd4nfkmrtlac6oce58601pbml@ds127646.mlab.com:27646/heroku_t75xnp7c';

// Finish
async function addEquip (req, res) {
	const newEquip = {
		department: req.body.department,
		type: req.body.type,
		brand: req.body.brand,
		model: req.body.model,
		serialNumber: req.body.serialNumber,
		characteristics: req.body.characteristics
	}

	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let equip = db.collection('equipment');

		equip.insertOne(newEquip, function(err, doc){
			if(err){
				console.log(err)
			} else {
				res.send({
					msg: "Equipo agregado"
				});
			}
		});

		client.close(function (err) {
			if(err) throw err;
		  });
	});
};

// Finish
async function getEquip (req, res) {
	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let equip = db.collection('equipment');

		equip.findOne({_id: new ObjectID(req.params.id) }, function(err, equip){
			res.send(equip);
		});

		client.close(function (err) {
			if(err) throw err;
		  });
	});
};

// Finish
async function updateEquip (req, res) {
	const updatedEquip = {
		department: req.body.department,
		type: req.body.type,
		brand: req.body.brand,
		model: req.body.model,
		serialNumber: req.body.serialNumber,
		characteristics: req.body.characteristics
	}

	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let users = db.collection('users');

		users.updateOne({_id: new objectID(req.params.id)},{
			$set: updatedEquip
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
};

// Finish
async function deleteEquip (req, res) {
	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let users = db.collection('equipment');

		users.deleteOne({
			username: req.params.id
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
        let collection = db.collection('equipment');

        collection.find().toArray()
            .then(result => {
                const equipment = result.map(equip => {
                    return {
						department: equip.department,
						type: equip.type,
						brand: equip.brand,
						model: equip.model,
						serialNumber: equip.serialNumber,
						characteristics: equip.characteristics
                    }
                })
                
                res.send(equipment);
            })
    
        client.close(function (err) {
            if(err) throw err;
          });
    });
}

module.exports = {
	addEquip: addEquip,
	getEquip: getEquip,
	updateEquip: updateEquip,
	deleteEquip: deleteEquip,
	getAll: getAll
};