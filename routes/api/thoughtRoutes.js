const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('./api/thoughts').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/api/thoughts/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('./api/thoughts/:thoughtId/reactions').post(updateThought).delete(deleteThought);

module.exports = router;