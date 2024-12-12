const express = require('express');

const authCtrl = require("../middleware/auth");

const router = express.Router();


// the stuff controler
const stuffCtrl = require("../controllers/stuff");

router.get('/:id', authCtrl, stuffCtrl.getOneThing);

router.get('/' +'', authCtrl, stuffCtrl.getAllStuff );

router.post('/', authCtrl, stuffCtrl.createThing);

router.put('/:id', authCtrl, stuffCtrl.modifyThing);

router.delete('/:id', authCtrl, stuffCtrl.deleteThing);


module.exports = router;