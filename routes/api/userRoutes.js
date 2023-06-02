const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router.route('/users/:userID').get(getOneUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/users/:userID/friends/:friendId')

module.exports = router;