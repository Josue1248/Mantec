var mongodb = require('mongodb').MongoClient;

let uri = 'mongodb://heroku_t75xnp7c:kgd4nfkmrtlac6oce58601pbml@ds127646.mlab.com:27646/heroku_t75xnp7c';

// Finish
async function addOrder (req, res) {
	const newOrder = {
		user: req.body.user,
		equip: req.body.equip,
		serviceType: req.body.serviceType,
		requestDate: new Date().toLocaleString(),
		lastUpdate: new Date().toLocaleString(),
		status: parseInt(req.body.status, 10)
	}

	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let order = db.collection('orders');

		order.insertOne(newOrder, function(err, doc){
			if(err){
				console.log(err)
			} else {
				res.send({
					msg: "Orden agregada"
				});
			}
		});

		client.close(function (err) {
			if(err) throw err;
		  });
	});
};

// Finish
async function getOrder (req, res) {
	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let order = db.collection('orders');

		order.findOne({_id: new ObjectID(req.params.id) }, function(err, order){
			res.send(order);
		});

		client.close(function (err) {
			if(err) throw err;
		});
	});
};

// Finish
async function updateOrder (req, res) {
	const updatedOrder = {
		user: req.body.email,
		equip: req.body.equip,
		serviceType: req.body.serviceType,
		lastUpdate: new Date().toJSON(),
		status: req.body.state
	}

	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let order = db.collection('orders');

		order.updateOne({_id: new objectID(req.params.id)},{
			$set: updatedOrder
		}, { 
			upsert: false 
		}, function(err, user){
			res.send({
				msg: "Orden actualizada"
			})
		});

		client.close(function (err) {
			if(err) throw err;
		  });
	});
};

// Finish
async function deleteOrder (req, res) {
	mongodb.connect(uri, function(err, client){
		let db = client.db('heroku_t75xnp7c');
		let order = db.collection('orders');

		order.deleteOne({
			_id: req.params.id
		})

		client.close(function (err) {
			if(err) throw err;
		  });
	});
	res.send({
		msg: `Se ha borrado la orden`
	})
};

// Finish
async function getAll (req, res) {
	mongodb.connect(uri, function(err, client){
        let db = client.db('heroku_t75xnp7c');
        let order = db.collection('orders');

        order.find().toArray()
            .then(result => {
                const equipment = result.map(order => {
					let status = 'Enviada' 

					switch(order.status){
						case 1:
							status = 'Enviada';
							break;
						case 2:
							status = 'En proceso';
							break;
						case 3:
							status = 'Cancelada';
							break
						case 4:
							status = 'Terminada';
							break
						default:
							status = 'Enviada'
					}

					return {
						user: order.user,
						equip: order.equip,
						serviceType: order.serviceType,
						requestDate: order.requestDate,
						lastUpdate: order.lastUpdate,
						status: status
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
	addOrder: addOrder,
	getOrder: getOrder,
	updateOrder: updateOrder,
	deleteOrder: deleteOrder,
	getAll: getAll
};