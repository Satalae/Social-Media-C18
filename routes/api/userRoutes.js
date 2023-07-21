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
router.route('/:userID').get(getOneUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userID/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;