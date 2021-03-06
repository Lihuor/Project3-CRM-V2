const express = require ('express'); 
const router = express.Router(); 
const Inventory = require('../models/Inventory');
const Electrician = require('../models/Electrician'); 
const User = require('../models/User'); 

// Inventory Section:
router.get('/inventories', function(req, res) { 
  Inventory.find(function(err, inventories) {
    res.json(inventories);
  });
});

router.get('/inventories/:id', function(req, res) {  
  Inventory.findById(req.params.id, function(err, inventory) {
    if (!inventory) {
      res.status(404).send('No result found');
    } else {
      res.json(inventory);
    }
  });
});

router.post('/inventories', function(req, res) {     
  let inventory = new Inventory(req.body);
  inventory.save()
    .then(inventory => {
      res.send(inventory);
    })
    .catch(function(err) {
      res.status(422).send('Inventory add failed');
    });
});

router.patch('/inventories/:id', function(req, res){    
  Inventory.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Inventory updated');
    })
    .catch(function(err) {
      res.status(422).send("Inventory update failed.");
    });
});

router.delete('/inventories/:id', function(req, res) {  
  Inventory.findById(req.params.id, function(err, inventory) {
    if (!inventory) {
      res.status(404).send('Inventory not found');
    } else {
      Inventory.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Inventory deleted") })
        .catch(function(err) {
          res.status(400).send("Inventory delete failed.");
        })
    }
  });
})

// Electrician Section:
router.get('/electricians', function(req, res) { 
  Electrician.find(function(err, electricians) {
    res.json(electricians);
  });
});

router.get('/electricians/:id', function(req, res) {  
  Electrician.findById(req.params.id, function(err, electrician) {
    if (!electrician) {
      res.status(404).send('No result found');
    } else {
      res.json(electrician);
    }
  });
});

router.post('/electricians', function(req, res) {     
  let electrician = new Electrician(req.body);
  electrician.save()
    .then(electrician => {
      res.send(electrician);
    })
    .catch(function(err) {
      res.status(422).send('Electrician add failed');
    });
});

router.patch('/electricians/:id', function(req, res){    
  Electrician.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('Electrician updated');
    })
    .catch(function(err) {
      res.status(422).send("Electrician update failed.");
    });
});

router.delete('/electricians/:id', function(req, res) {  
  Electrician.findById(req.params.id, function(err, electrician) {
    if (!electrician) {
      res.status(404).send('Electrician not found');
    } else {
      electrician.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Electrician deleted") })
        .catch(function(err) {
          res.status(400).send("Electrician delete failed.");
        })
    }
  });
})

// Users Section:
router.get('/users', function(req, res) { 
  User.find(function(err, users) {
    res.json(users);
  });
});

router.get('/users/:id', function(req, res) {  
  User.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(404).send('No result found');
    } else {
      res.json(user);
    }
  });
});

router.post('/users', function(req, res) {     
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user);
    })
    .catch(function(err) {
      res.status(422).send('User add failed');
    });
});

router.patch('/users/:id', function(req, res){    
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('User updated');
    })
    .catch(function(err) {
      res.status(422).send("User update failed.");
    });
});

router.delete('/users/:id', function(req, res) {  
  User.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(404).send('User not found');
    } else {
      user.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("User deleted") })
        .catch(function(err) {
          res.status(400).send("User delete failed.");
        })
    }
  });
})
module.exports = router;