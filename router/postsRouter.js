// importiamo express
const express = require('express');
// creiamo una variabile router il cui valore sarà un istanza di express.Router()
const router = express.Router();
//importiamo il controller dei posts
const postsController = require('../controllers/postsControllers')

// ROTTE CRUD
// index
router.get('/', postsController.index);

// show
router.get('/:id', postsController.show);

// store
router.post('/', postsController.store);

// update
router.put('/:id', postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:id', postsController.destroy);







// esportiamo router
module.exports = router
