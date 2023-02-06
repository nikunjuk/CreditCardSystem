const router = require('express').Router()
const userController = require('../controller/userController');

router.get('/user/getAll',  userController.getAll);
router.post('/user/addUser',  userController.addUser);
router.post('/user/delete',  userController.delete);

module.exports = router