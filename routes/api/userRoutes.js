const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router.route('/:userID').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userID/friends/:friendID').post(createFriend).delete(deleteFriend);

module.exports = router;